import { type UseCase } from '../../common/useCase'
import { type ICustomerRepository } from '../repositories/customerRepository'
import { type IDatabaseRepository } from '../repositories/databaseRepository'
import { type ITransactionRepository } from '../repositories/transactionRepository'
import {
  type InputGetStatementDto,
  type OutputGetStatementDto,
} from './dto/getStatement.dto'

export class GetStatement
  implements UseCase<InputGetStatementDto, OutputGetStatementDto>
{
  constructor(
    private readonly databaseRepository: IDatabaseRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async exec(input: InputGetStatementDto): Promise<OutputGetStatementDto> {
    await this.databaseRepository.startTransaction()

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

    await this.databaseRepository.finishTransaction()

    return { customer, lastTransactions, statementDate }
  }
}
