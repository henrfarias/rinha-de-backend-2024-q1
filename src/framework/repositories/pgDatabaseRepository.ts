import { type PoolClient } from 'pg'
import {
  type IDatabaseRepository,
  type IOptionsFinishTransaction,
} from '../../domain/repositories/databaseRepository'

export class PgDatabaseRepository implements IDatabaseRepository {
  public transaction = false
  constructor(public readonly client: PoolClient) {}

  async startTransaction(): Promise<void> {
    await this.client.query('BEGIN')
    this.transaction = true
  }

  async finishTransaction(options?: IOptionsFinishTransaction): Promise<void> {
    await this.client.query(options?.rollback ? 'ROLLBACK' : 'COMMIT')
    this.transaction = false
  }
}
