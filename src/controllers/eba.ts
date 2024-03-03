import {
  type FastifyRequest,
  type FastifyReply,
  type RouteHandler,
} from 'fastify'
import { type HttpResponse } from '../framework/types/http'

export function ebaController(): RouteHandler {
  return async (request: FastifyRequest, reply: FastifyReply): HttpResponse => {
    await reply.send('Eba!')
    return 'Eba!'
  }
}
