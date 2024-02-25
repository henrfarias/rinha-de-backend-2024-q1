import { Customer } from '../../src/domain/entity/customer'

describe('Customer Entity', () => {
  describe('Withdraw', () => {
    describe('should withdraw from balance', () => {
      test('from 10000 to 8000 when pass amount = 2000', () => {
        const sut = new Customer({
          id: 1,
          balance: 10000,
          limit: 10000,
        })
        sut.withdraw(2000)
        expect(sut.balance).toBe(8000)
      })

      test('from 1000 to -2000 when pass amount = 3000', () => {
        const sut = new Customer({
          id: 1,
          balance: 1000,
          limit: 10000,
        })
        sut.withdraw(3000)
        expect(sut.balance).toBe(-2000)
      })

      test('from -2000 to -5000 when pass amount = 3000', () => {
        const sut = new Customer({
          id: 1,
          balance: -2000,
          limit: 10000,
        })
        sut.withdraw(3000)
        expect(sut.balance).toBe(-5000)
      })
    })
    test('should throw error when try withdraw more than limit', () => {
      const sut = new Customer({
        id: 1,
        balance: -9000,
        limit: 10000,
      })
      expect(() => {
        sut.withdraw(2000)
      }).toThrow(new Error('WITHOUT_LIMIT'))
    })

    test('should withdraw when result balance amount is greater than limit', () => {
      const sut = new Customer({
        id: 1,
        balance: 12000,
        limit: 10000,
      })
      sut.withdraw(1000)
      expect(sut.balance).toBe(11000)
    })

    test('should throw error when balance amount is positive but withdraw exceeded balance + limit', () => {
      const sut = new Customer({
        id: 1,
        balance: 120_00,
        limit: 100_00,
      })
      expect(() => {
        sut.withdraw(120_00 + 100_00 + 10)
      }).toThrow('WITHOUT_LIMIT')
    })
  })

  describe('Deposit', () => {
    describe('should deposit on balance', () => {
      test('from -2000 to 0 when pass amount = 2000', () => {
        const sut = new Customer({
          id: 1,
          balance: -2000,
          limit: 10000,
        })
        sut.deposit(2000)
        expect(sut.balance).toBe(0)
      })

      test('from -2000 to -1000 when pass amount = 1000', () => {
        const sut = new Customer({
          id: 1,
          balance: -2000,
          limit: 10000,
        })
        sut.deposit(1000)
        expect(sut.balance).toBe(-1000)
      })

      test('from 0 to 2000 when pass amount = 2000', () => {
        const sut = new Customer({
          id: 1,
          balance: 0,
          limit: 10000,
        })
        sut.deposit(2000)
        expect(sut.balance).toBe(2000)
      })
    })
  })
})
