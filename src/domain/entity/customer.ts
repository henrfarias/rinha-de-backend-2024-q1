interface IInputCreateCustomer {
  id: number
  limit: number
  balance: number
}

export class Customer {
  id: number
  limit: number
  balance: number

  constructor(props: IInputCreateCustomer) {
    this.id = props.id
    this.limit = props.limit
    this.balance = props.balance
  }

  withdraw(amount: number): void {
    const amountAvailable = this.limit + this.balance
    if (amount > amountAvailable) {
      throw new Error('WITHOUT_LIMIT')
    }
    this.balance -= amount
  }

  deposit(amount: number): void {
    this.balance += amount
  }
}
