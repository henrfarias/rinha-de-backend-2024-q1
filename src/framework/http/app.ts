import Fastify, {
  type FastifyInstance,
  type FastifyHttpOptions,
  type FastifyBaseLogger,
} from 'fastify'
import { type Server } from 'https'
import routes from './routes'
import {
  ebaController,
  executeTransactionController,
  getStatementController,
} from '../../controllers'

export const build = (
  options: FastifyHttpOptions<Server, FastifyBaseLogger> = {},
): FastifyInstance => {
  const fastify = Fastify(options)

  fastify.setErrorHandler(async (error, _request, reply) => {
    if (error.validation) {
      error.statusCode = 422
      await reply.send(error)
    }
  })

  return fastify
}

export const controllers = {
  ebaController: ebaController(),
  executeTransactionController: executeTransactionController(),
  getStatementController: getStatementController(),
}

export const server = async (): Promise<void> => {
  const fastify = build({ logger: false })
  await fastify.register(routes, controllers)
  fastify.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`)
  })
}
