import { type Transaction } from '../../domain/entity/transaction'
import { type ITransactionRepository } from '../../domain/repositories/transactionRepository'
import { type PgDatabaseRepository } from './pgDatabaseRepository'

export class TransactionRepository implements ITransactionRepository {
  public tableName = 'transactions'
  constructor(private readonly db: PgDatabaseRepository) {}

  async create(entity: Transaction): Promise<void> {
    await this.db.client.query(
      `
      INSERT INTO ${this.tableName} (amount, type, description, "customerId", "createdAt")
      VALUES ($1, $2, $3, $4, $5)
    `,
      [
        entity.amount,
        entity.type,
        entity.description,
        entity.customerId,
        entity.createdAt.toISOString(),
      ],
    )
  }
}
