import routes from '../../../src/framework/http/routes'
import { build, controllers } from '../../../src/framework/http/server'

describe('GET /eba', () => {
  const fastify = build()
  beforeAll(async () => {
    await fastify.register(routes, controllers)
    await fastify.listen({ port: 3000 })
    await fastify.ready()
  })
  afterAll(async () => {
    await fastify.close()
  })
  test('responds with "Eba!"', async () => {
    const response = await fastify.inject().get('/eba')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('Eba!')
  })
})
