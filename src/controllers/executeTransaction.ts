import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type HttpResponse } from '../framework/types/http'
import {
  type ClientParam,
  type ExecuteTransactionBody,
} from '../framework/http/schemas'
import { type TransactionType } from '../domain/entity/transaction'
import { type PoolClient } from 'pg'
import { pool } from '../framework/database/db'
import { executeTransactionBuilder } from '../framework/main/executeTransactionBuilder'

export function executeTransactionController() {
  return async (
    request: FastifyRequest<{
      Params: ClientParam
      Body: ExecuteTransactionBody
    }>,
    _reply: FastifyReply,
  ): HttpResponse => {
    let client: PoolClient | undefined
    try {
      client = await pool.connect()
      const useCase = await executeTransactionBuilder(client)
      const response = await useCase.exec({
        customerId: +request.params.clientId,
        amount: request.body.valor,
        type: request.body.tipo as TransactionType,
        description: request.body.descricao,
      })
      return {
        statusCode: 200,
        body: {
          limite: response.limit,
          saldo: response.balance,
        },
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'CUSTOMER_NOT_FOUND') {
          return { statusCode: 404, body: { message: 'CUSTOMER_NOT_FOUND' } }
        }
        if (error.message === 'NO_CUSTOMER_UPDATED') {
          return { statusCode: 404, body: { message: 'NO_CUSTOMER_UPDATED' } }
        }
        if (error.message === 'WITHOUT_LIMIT') {
          return { statusCode: 422, body: { message: 'WITHOUT_LIMIT' } }
        }
      }
      console.log(error)
      return { statusCode: 500, message: 'INTERNAL_ERROR' }
    } finally {
      client?.release()
    }
  }
}
