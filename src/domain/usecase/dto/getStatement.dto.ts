import { type Customer } from '../../entity/customer'
import { type Transaction } from '../../entity/transaction'

export interface InputGetStatementDto {
  customerId: number
}

export interface OutputGetStatementDto {
  customer: Customer
  lastTransactions: Transaction[]
  statementDate: Date
}
