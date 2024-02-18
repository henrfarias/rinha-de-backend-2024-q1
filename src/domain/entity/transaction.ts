export enum TransactionType {
  CREDIT = 'c',
  DEBIT = 'd',
}

export interface IInputCreateTransaction {
  amount: number
  type: TransactionType
  description: string
  customerId: number
  createdAt?: Date
}

export class Transaction {
  amount: number
  type: TransactionType
  description: string
  customerId: number
  createdAt: Date

  constructor(props: IInputCreateTransaction) {
    this.amount = props.amount
    this.type = props.type
    this.description = props.description
    this.customerId = props.customerId
    this.createdAt = props.createdAt ?? new Date()
  }
}
