import { type FastifyRequest, type FastifyReply } from 'fastify'
import { type HttpResponse } from '../framework/types/http'
import { type ClientParam } from '../framework/http/schemas'
import { type PoolClient } from 'pg'
import { pool } from '../framework/database/db'
import { getStatementBuilder } from '../framework/main/getStatementBuilder'

export function getStatementController() {
  return async (
    request: FastifyRequest<{ Params: ClientParam }>,
    reply: FastifyReply,
  ): HttpResponse => {
    let client: PoolClient | undefined
    try {
      client = await pool.connect()
      const useCase = await getStatementBuilder(client)
      const response = await useCase.exec({
        customerId: +request.params.clientId,
      })
      void reply.status(200).send({
        saldo: {
          total: response.customer.balance,
          data_extrato: response.statementDate.toISOString(),
          limite: response.customer.limit,
        },
        ultimas_transacoes: response.lastTransactions.map((transaction) => ({
          valor: transaction.amount,
          tipo: transaction.type,
          descricao: transaction.description,
          realizada_em: transaction.createdAt.toISOString(),
        })),
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'CUSTOMER_NOT_FOUND') {
          void reply.status(404).send({ message: 'CUSTOMER_NOT_FOUND' })
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
