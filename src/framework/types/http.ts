import { type RouteGenericInterface, type FastifySchema } from 'fastify'
import {
  type FastifyTypeProvider,
  type ResolveFastifyReplyReturnType,
} from 'fastify/types/type-provider'

export type HttpResponse = Promise<
  ResolveFastifyReplyReturnType<
    FastifyTypeProvider,
    FastifySchema,
    RouteGenericInterface
  >
>
