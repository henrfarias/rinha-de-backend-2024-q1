import { type Transaction } from '../entity/transaction'

export interface ITransactionRepository {
  create: (entity: Transaction) => Promise<void>
}
