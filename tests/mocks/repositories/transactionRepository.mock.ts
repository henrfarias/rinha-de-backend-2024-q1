import { type ITransactionRepository } from '../../../src/domain/repositories/transactionRepository'
import {
  Transaction,
  TransactionType,
} from '../../../src/domain/entity/transaction'

export const fakeTransactionEntity = new Transaction({
  amount: 1000,
  customerId: 1,
  description: 'transaction',
  type: TransactionType.CREDIT,
  createdAt: new Date(),
})

export const transactionRepositoryMock: jest.Mocked<ITransactionRepository> = {
  create: jest.fn().mockResolvedValue(undefined),
}
