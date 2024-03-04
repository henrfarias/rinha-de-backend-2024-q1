import { type PoolClient } from 'pg'
import { createTransaction } from '../../domain/factories/createTransaction.factory'
import { ExecuteTransaction } from '../../domain/usecase/executeTransaction'
import { CustomerRepository } from '../repositories/customerRepository'
import { PgDatabaseRepository } from '../repositories/pgDatabaseRepository'
import { TransactionRepository } from '../repositories/transactionRepository'

export async function executeTransactionBuilder(
  client: PoolClient,
): Promise<ExecuteTransaction> {
  const databaseRepository = new PgDatabaseRepository(client)
  const transactionRepository = new TransactionRepository(databaseRepository)
  const customerRepository = new CustomerRepository(databaseRepository)
  const executeTransactionUseCase = new ExecuteTransaction(
    createTransaction,
    databaseRepository,
    customerRepository,
    transactionRepository,
  )
  return executeTransactionUseCase
}
