import { type Transaction } from '../domain/transaction'

export interface ITransactionRepository {
  create: (entity: Transaction) => Promise<Transaction>
}
