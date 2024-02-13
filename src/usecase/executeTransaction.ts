import { type UseCase } from '../common/useCase'
import { type ICreateTransaction } from '../domain/factories/createTransaction.factory'
import { TransactionType } from '../domain/transaction'
import { type ICustomerRepository } from '../repositories/customerRepository'
import { type ITransactionRepository } from '../repositories/transactionRepository'
import {
  type InputExecuteTransactionDto,
  type OutputExecuteTransactionDto,
} from './dto/executeTransaction.dto'

export class ExecuteTransaction
  implements UseCase<InputExecuteTransactionDto, OutputExecuteTransactionDto>
{
  constructor(
    private readonly createTransaction: ICreateTransaction,
    private readonly customerRepository: ICustomerRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async exec(
    input: InputExecuteTransactionDto,
  ): Promise<OutputExecuteTransactionDto> {
    const customer = await this.customerRepository.findById(input.customerId)
    if (customer === null) throw new Error('CUSTOMER_NOT_FOUND')
    const transaction = this.createTransaction({
      customerId: input.customerId,
      amount: input.amount,
      description: input.description,
      type: input.type,
    })
    console.log({ customer, transaction })
    if (transaction.type === TransactionType.CREDIT)
      customer.deposit(input.amount)
    if (transaction.type === TransactionType.DEBIT)
      customer.withdraw(input.amount)
    await Promise.all([
      this.customerRepository.update({
        id: customer.id,
        data: { balance: customer.balance },
      }),
      this.transactionRepository.create(transaction),
    ])
    return {
      balance: customer.balance,
      limit: customer.limit,
    }
  }
}
