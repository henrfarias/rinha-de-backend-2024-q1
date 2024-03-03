import { type RouteHandler, type FastifyInstance } from 'fastify'
import { clientParamSchema, executeTransactionBodySchema } from './schemas'
import { type controllers } from './server'

export default async function routes(
  fastify: FastifyInstance,
  opts: typeof controllers,
): Promise<void> {
  fastify.get('/eba', opts.ebaController)

  fastify.post(
    '/clientes/:clientId/transacoes',
    {
      schema: { params: clientParamSchema, body: executeTransactionBodySchema },
    },
    opts.executeTransactionController as RouteHandler,
  )

  fastify.get(
    '/clientes/:clientId/extrato',
    { schema: { params: clientParamSchema } },
    opts.getStatementController,
  )
}
