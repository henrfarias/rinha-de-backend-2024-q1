import { Transaction } from '../../domain/entity/transaction'
import {
  type IInputFindManyTransactions,
  type ITransactionRepository,
} from '../../domain/repositories/transactionRepository'
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

  async findMany(input: IInputFindManyTransactions): Promise<Transaction[]> {
    const [orderByKey, orderByValue] = Object.entries(input.orderBy)[0]
    const { rows } = await this.db.client.query(
      `
        SELECT * FROM ${this.tableName}
        WHERE "customerId" = $1 AND "createdAt" <= $2
        ORDER BY "${orderByKey}" ${orderByValue}
        LIMIT $3
        `,
      [
        input.where.customerId,
        input.where.createdAt.lte.toISOString(),
        input.take,
      ],
    )
    return rows.map((row) => {
      return new Transaction({
        amount: row.amount,
        type: row.type,
        description: row.description,
        customerId: row.customerId,
        createdAt: new Date(row.createdAt as string),
      })
    })
  }
}
