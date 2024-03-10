import { type UseCase } from '../../common/useCase'
import { type ICustomerRepository } from '../repositories/customerRepository'
import { type ITransactionRepository } from '../repositories/transactionRepository'
import {
  type InputGetStatementDto,
  type OutputGetStatementDto,
} from './dto/getStatement.dto'

export class GetStatement
  implements UseCase<InputGetStatementDto, OutputGetStatementDto>
{
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async exec(input: InputGetStatementDto): Promise<OutputGetStatementDto> {
    const statementDate = new Date()

    const customer = await this.customerRepository.findById({
      id: input.customerId,
    })
    if (customer === null) throw new Error('CUSTOMER_NOT_FOUND')

    const lastTransactions = await this.transactionRepository.findMany({
      where: {
        customerId: input.customerId,
        createdAt: { lte: statementDate },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    return { customer, lastTransactions, statementDate }
  }
}
