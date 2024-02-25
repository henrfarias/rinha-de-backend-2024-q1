import { TransactionType } from '../../src/domain/entity/transaction'
import { ExecuteTransaction } from '../../src/domain/usecase/executeTransaction'
import { createTransactionMock } from '../mocks/domain/factories/createTransaction.factory.mock'
import {
  customerRepositoryMock,
  createFakeCustomerEntity,
} from '../mocks/repositories/customerRepository.mock'
import { transactionRepositoryMock } from '../mocks/repositories/transactionRepository.mock'

describe('Execute transaction use case', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })
  const transactionRepository = transactionRepositoryMock
  const customerRepository = customerRepositoryMock
  const createTransaction = createTransactionMock
  const sut = new ExecuteTransaction(
    createTransaction,
    customerRepository,
    transactionRepository,
  )
  const fakeInput = {
    amount: 5_00,
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

  test('should create transaction with right params', async () => {
    await sut.exec(fakeInput)
    expect(createTransaction).toHaveBeenCalledWith({
      customerId: fakeInput.customerId,
      amount: fakeInput.amount,
      description: fakeInput.description,
      type: fakeInput.type,
    })
  })

  test('should call customer.deposit once when transaction type is CREDIT', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const depositSpy = jest.spyOn(fakeCustomer, 'deposit')
    await sut.exec(fakeInput)
    expect(depositSpy).toHaveBeenCalledTimes(1)
    expect(depositSpy).toHaveBeenCalledWith(fakeInput.amount)
  })

  test('should not call customer.deposit when transaction type is DEBIT', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const depositSpy = jest.spyOn(fakeCustomer, 'deposit')
    await sut.exec({ ...fakeInput, type: TransactionType.DEBIT })
    expect(depositSpy).not.toHaveBeenCalled()
  })

  test('should call customer.withdraw when transaction type is DEBIT', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const withdrawSpy = jest.spyOn(fakeCustomer, 'withdraw')
    await sut.exec({ ...fakeInput, type: TransactionType.DEBIT })
    expect(withdrawSpy).toHaveBeenCalledTimes(1)
    expect(withdrawSpy).toHaveBeenCalledWith(fakeInput.amount)
  })

  test('should not call customer.withdraw when transaction type is CREDIT', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const withdrawSpy = jest.spyOn(fakeCustomer, 'withdraw')
    await sut.exec({ ...fakeInput })
    expect(withdrawSpy).not.toHaveBeenCalled()
  })

  test('should throw an error if withdraw was higher than the available limit', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const execution = sut.exec({
      ...fakeInput,
      amount: 200_00,
      type: TransactionType.DEBIT,
    })
    await expect(execution).rejects.toThrow('WITHOUT_LIMIT')
  })

  test('should call customerRepository.update with the right params', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const customerUpdateSpy = customerRepositoryMock.update
    await sut.exec({ ...fakeInput, amount: 500 })
    expect(customerUpdateSpy).toHaveBeenCalledWith({
      id: createFakeCustomerEntity().id,
      data: { balance: 500 },
    })
  })

  test('should call transactionRepository.create with the right params', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const transactionCreateSpy = transactionRepositoryMock.create
    await sut.exec({ ...fakeInput, amount: 500 })
    expect(transactionCreateSpy).toHaveBeenCalledWith({
      customerId: fakeInput.customerId,
      amount: fakeInput.amount,
      description: fakeInput.description,
      type: fakeInput.type,
      createdAt: expect.any(Date),
    })
  })

  test('should return updated balance and limit from customer', async () => {
    const fakeCustomer = createFakeCustomerEntity()
    customerRepositoryMock.findById.mockResolvedValueOnce(fakeCustomer)
    const result = await sut.exec(fakeInput)
    expect(result).toStrictEqual({
      balance: 500,
      limit: 1000,
    })
  })
})
