import { dirname } from 'path'
import { pool } from '../../src/framework/database/db'
import { readFile } from 'fs/promises'

export async function up(): Promise<void> {
  try {
    console.log(process.env.DATABASE)
    console.log('up database...')
    const client = await pool.connect()
    const currentFile = __dirname
    const cwd = dirname(currentFile)
    const createTableFile = `${cwd}/../src/framework/database/createTables.sql`
    const seedFile = `${cwd}/../src/framework/database/seed.sql`
    await client.query(await readFile(createTableFile, 'utf-8'))
    await client.query(await readFile(seedFile, 'utf-8'))
    client.release()
  } catch (err) {
    console.error(err)
    // process.exit(1)
  }
}

export async function down(): Promise<void> {
  try {
    console.log('down database...')
    const client = await pool.connect()
    await client.query('DELETE FROM transactions; DELETE FROM customers;')
    client.release()
  } catch (err) {
    console.error(err)
    // process.exit(1)
  }
}

export const testPool = pool
