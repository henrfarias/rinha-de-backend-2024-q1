import { Customer } from '../../domain/entity/customer'
import {
  type IInputUpdateCustomer,
  type ICustomerRepository,
  type IInputFindCustomerBy,
} from '../../domain/repositories/customerRepository'
import { type PgDatabaseRepository } from './pgDatabaseRepository'

export class CustomerRepository implements ICustomerRepository {
  public tableName = 'customers'
  constructor(private readonly db: PgDatabaseRepository) {}

  async findById(input: IInputFindCustomerBy): Promise<Customer | null> {
    const customer = await this.db.client.query<Customer>(
      `SELECT * FROM ${this.tableName} WHERE id = $1 ${input.lock ? 'FOR UPDATE' : ''}`,
      [input.id],
    )
    return customer.rows[0] && new Customer(customer.rows[0])
  }

  async update(input: IInputUpdateCustomer): Promise<void> {
    const values = Object.entries(input.data).filter(
      ([, value]) => typeof value !== 'function',
    )

    const fieldsValues = values.map(([, value]) => value)

    const sqlFields = values
      .map(([key], index) => `"${key}" = $${index + 1}`)
      .join(',')

    const updatedCustomer = await this.db.client.query(
      `
      UPDATE ${this.tableName} SET
      ${sqlFields}
      WHERE id = $${fieldsValues.length + 1}
      `,
      [...fieldsValues, input.id],
    )

    if (updatedCustomer.rowCount === 0) throw new Error('NO_CUSTOMER_UPDATED')
  }
}
