import { type ICustomerRepository } from '../../../src/domain/repositories/customerRepository'
import { Customer } from '../../../src/domain/entity/customer'

export const fakeCustomerEntity = new Customer({
  id: 1,
  balance: 0,
  limit: 1000,
})

export const customerRepositoryMock: jest.Mocked<ICustomerRepository> = {
  findById: jest.fn().mockResolvedValue(fakeCustomerEntity),
  update: jest.fn().mockResolvedValue(fakeCustomerEntity),
}
