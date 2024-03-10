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
    reply: FastifyReply,
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
      void reply
        .status(200)
        .send({ limite: response.limit, saldo: response.balance })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'CUSTOMER_NOT_FOUND') {
          void reply.status(404).send({ message: 'CUSTOMER_NOT_FOUND' })
          return
        }
        if (error.message === 'NO_CUSTOMER_UPDATED') {
          void reply.status(404).send({ message: 'NO_CUSTOMER_UPDATED' })
          return
        }
        if (error.message === 'WITHOUT_LIMIT') {
          void reply.status(422).send({ message: 'WITHOUT_LIMIT' })
          return
        }
      }
      void reply.status(500).send({ message: 'INTERNAL_ERROR' })
      return
    } finally {
      client?.release()
    }
  }
}
