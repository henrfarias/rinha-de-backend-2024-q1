import { type Customer } from '../domain/customer'

export interface IInputUpdateCustomer {
  id: number
  data: Partial<Customer>
}

export interface ICustomerRepository {
  findById: (id: number) => Promise<Customer | null>
  update: (input: IInputUpdateCustomer) => Promise<Customer>
}
