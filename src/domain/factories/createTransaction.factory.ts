import { type IInputCreateTransaction, Transaction } from '../transaction'

export type ICreateTransaction = (input: IInputCreateTransaction) => Transaction

export function createTransaction(input: IInputCreateTransaction): Transaction {
  return new Transaction(input)
}
