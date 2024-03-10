import { type PoolClient } from 'pg'
import { CustomerRepository } from '../repositories/customerRepository'
import { PgDatabaseRepository } from '../repositories/pgDatabaseRepository'
import { TransactionRepository } from '../repositories/transactionRepository'
import { GetStatement } from '../../domain/usecase/getStatement'

export async function getStatementBuilder(
  client: PoolClient,
): Promise<GetStatement> {
  const databaseRepository = new PgDatabaseRepository(client)
  const transactionRepository = new TransactionRepository(databaseRepository)
  const customerRepository = new CustomerRepository(databaseRepository)
  const getStatementUseCase = new GetStatement(
    databaseRepository,
    customerRepository,
    transactionRepository,
  )
  return getStatementUseCase
}
