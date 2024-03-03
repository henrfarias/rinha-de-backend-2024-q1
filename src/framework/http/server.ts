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
  const fastify = build({ logger: true })
  await build().register(routes, controllers)
  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}