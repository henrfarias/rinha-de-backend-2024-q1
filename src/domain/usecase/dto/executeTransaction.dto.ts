import { type TransactionType } from '../../entity/transaction'

export interface InputExecuteTransactionDto {
  customerId: number
  amount: number
  type: TransactionType
  description: string
}

export interface OutputExecuteTransactionDto {
  limit: number
  balance: number
}
