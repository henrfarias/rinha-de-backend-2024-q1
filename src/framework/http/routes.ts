import { type FastifyInstance } from 'fastify'

export default async function routes (fastify: FastifyInstance): Promise<void> {
  fastify.post('/clientes/:clientId/transacoes', {schema: {params: {type: 'object',
  properties: {
    clientId: { type: 'string' },
  }}}},async (request, reply) => {
    const { clientId } = request.params
    return { hello: 'world' }
  })

  fastify.get('/clientes/:clientId/extrato', async (request, reply) => {
    const { clientId } = request.params
    return { hello: 'world' }
  })
}