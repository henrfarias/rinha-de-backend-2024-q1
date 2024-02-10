import { type ITransactionRepository } from '../../src/repositories/transactionRepository'
import { Transaction, TransactionType } from '../../src/domain/transaction'

export const fakeTransactionEntity = new Transaction({
  amount: 1000,
  customerId: 1,
  description: 'transaction',
  type: TransactionType.CREDIT,
  createdAt: new Date(),
})

export const transactionRepositoryMock: jest.Mocked<ITransactionRepository> = {
  create: jest.fn().mockResolvedValue(fakeTransactionEntity),
}
