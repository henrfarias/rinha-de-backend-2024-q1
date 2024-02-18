import { type Customer } from '../entity/customer'

export interface IInputUpdateCustomer {
  id: number
  data: Partial<Customer>
}

export interface ICustomerRepository {
  findById: (id: number) => Promise<Customer | null>
  // getForUpdate connection('BEGIN')
  // ERRO
  update: (input: IInputUpdateCustomer) => Promise<Customer> // connection('COMMIT')
}
