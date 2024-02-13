import { Transaction, TransactionType } from '../../src/domain/transaction'
import { ExecuteTransaction } from '../../src/usecase/executeTransaction'
import {
  customerRepositoryMock,
  fakeCustomerEntity,
} from '../mocks/repositories/customerRepository.mock'
import { transactionRepositoryMock } from '../mocks/repositories/transactionRepository.mock'

describe('Execute transaction use case', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  const transactionRepository = transactionRepositoryMock
  const customerRepository = customerRepositoryMock
  const sut = new ExecuteTransaction(customerRepository, transactionRepository)
  const fakeInput = {
    amount: 1000,
    customerId: 2,
    description: 'Ow yeah',
    type: TransactionType.CREDIT,
  }

  test('should use customerId to find customer by repository', async () => {
    const input = {
      ...fakeInput,
      customerId: 2,
    }
    await sut.exec(input)
    expect(customerRepository.findById).toHaveBeenCalledWith(input.customerId)
  })

  test('should throw an error when customer wasn`t found', async () => {
    customerRepositoryMock.findById.mockResolvedValueOnce(null)
    await expect(sut.exec(fakeInput)).rejects.toThrow('CUSTOMER_NOT_FOUND')
  })

  test.skip('should create transaction with right params', async () => {
    await sut.exec(fakeInput)
    expect(Transaction).toHaveBeenCalledWith({
      customerId: fakeInput.customerId,
      amount: fakeInput.amount,
      description: fakeInput.description,
      type: fakeInput.type,
    })
  })

  test('should call customer.deposit once when transaction type is CREDIT', async () => {
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomerEntity)
    const depositSpy = jest.spyOn(fakeCustomerEntity, 'deposit')
    await sut.exec(fakeInput)
    expect(depositSpy).toHaveBeenCalledTimes(1)
    expect(depositSpy).toHaveBeenCalledWith(fakeInput.amount)
  })

  test('should not call customer.deposit when transaction type is DEBIT', async () => {
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomerEntity)
    const depositSpy = jest.spyOn(fakeCustomerEntity, 'deposit')
    await sut.exec({ ...fakeInput, type: TransactionType.DEBIT })
    expect(depositSpy).not.toHaveBeenCalled()
  })

  test.todo('should call customer.withdraw when transaction type is DEBIT')
  test.todo('should not call customer.withdraw when transaction type is CREDIT')
  test.todo(
    'should throw an error if withdraw was higher than the available limit',
  )
  test.todo('should call customerRepository.update with the right params')
  test.todo('should call transactionRepository.create with the right params')
  test.todo('should return updated balance and limit from customer')
})
