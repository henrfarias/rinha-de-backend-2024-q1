import {
  type FastifyRequest,
  type FastifyReply,
  type RouteHandler,
} from 'fastify'
import { type HttpResponse } from '../framework/types/http'

export function getStatementController(): RouteHandler {
  return async (request: FastifyRequest, reply: FastifyReply): HttpResponse => {
    return { hello: `world` }
  }
}
