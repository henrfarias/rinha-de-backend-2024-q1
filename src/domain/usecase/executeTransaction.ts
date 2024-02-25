import { type UseCase } from '../../common/useCase'
import { TransactionType } from '../entity/transaction'
import { type ICreateTransaction } from '../factories/createTransaction.factory'
import { type ICustomerRepository } from '../repositories/customerRepository'
import { type IDatabaseRepository } from '../repositories/databaseRepository'
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
    private readonly databaseRepository: IDatabaseRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async exec(
    input: InputExecuteTransactionDto,
  ): Promise<OutputExecuteTransactionDto> {
    try {
      await this.databaseRepository.startTransaction()
      const customer = await this.customerRepository.findById({
        id: input.customerId,
        lock: true,
      })
      if (customer === null) throw new Error('CUSTOMER_NOT_FOUND')
      const transaction = this.createTransaction({
        customerId: input.customerId,
        amount: input.amount,
        description: input.description,
        type: input.type,
      })
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
      await this.databaseRepository.finishTransaction()
      return {
        balance: customer.balance,
        limit: customer.limit,
      }
    } catch (err) {
      await this.databaseRepository.finishTransaction({ rollback: true })
      throw err
    }
  }
}
