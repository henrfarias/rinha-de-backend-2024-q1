import { type ICreateTransaction } from '../../../../src/domain/factories/createTransaction.factory'
import {
  type IInputCreateTransaction,
  Transaction,
} from '../../../../src/domain/entity/transaction'

export const createTransactionMock: jest.Mocked<ICreateTransaction> = jest
  .fn()
  .mockImplementation(
    (value: IInputCreateTransaction) => new Transaction(value),
  )
