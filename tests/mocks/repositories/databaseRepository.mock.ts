import { type IDatabaseRepository } from '../../../src/domain/repositories/databaseRepository'

export const databaseRepositoryMock: jest.Mocked<IDatabaseRepository> = {
  startTransaction: jest.fn(),
  finishTransaction: jest.fn(),
}
