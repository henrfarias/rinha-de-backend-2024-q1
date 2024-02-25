import { type Customer } from '../entity/customer'

export interface IInputUpdateCustomer {
  id: number
  data: Partial<Customer>
}

export interface IInputFindCustomerBy {
  id: number
  lock?: boolean
}

export interface ICustomerRepository {
  findById: (input: IInputFindCustomerBy) => Promise<Customer | null>
  update: (input: IInputUpdateCustomer) => Promise<Customer>
}
