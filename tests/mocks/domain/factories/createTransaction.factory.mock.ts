import { type ICreateTransaction } from '../../../../src/domain/factories/createTransaction.factory'
import {
  type IInputCreateTransaction,
  Transaction,
} from '../../../../src/domain/transaction'

export const createTransactionMock: jest.Mocked<ICreateTransaction> = jest
  .fn()
  .mockImplementation(
    (value: IInputCreateTransaction) => new Transaction(value),
  )
