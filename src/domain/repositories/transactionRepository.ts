import { type Transaction } from '../entity/transaction'

export interface IInputFindManyTransactions {
  where: {
    customerId: number
    createdAt: { lte: Date }
  }
  orderBy: {
    createdAt: 'asc' | 'desc'
  }
  take: number
}

export interface ITransactionRepository {
  create: (entity: Transaction) => Promise<void>
  findMany: (input: IInputFindManyTransactions) => Promise<Transaction[]>
}
