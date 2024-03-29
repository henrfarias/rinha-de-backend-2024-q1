import routes from '../../../src/framework/http/routes'
import { build, controllers } from '../../../src/framework/http/app'
import { down, testPool, up } from '../../utils/database-utils'
jest.setTimeout(10 * 1000)

describe('POST /clientes/:clientId/transacoes', () => {
  const fastify = build()
  beforeAll(async () => {
    await up()
    await fastify.register(routes, controllers)
    await fastify.listen({ port: 3000 })
    await fastify.ready()
  })

  beforeEach(async () => {
    await down()
    await up()
  })

  afterAll(async () => {
    await down()
    await fastify.close()
    await testPool.end()
  })
  test('should return statusCode 422 when transaction type is unknown', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/1/transacoes')
      .body({
        valor: 100,
        tipo: 'E',
        descricao: 'Teste',
      })
    expect(JSON.parse(response.body).message).toBe(
      'body/tipo must be equal to one of the allowed values',
    )
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 422 when valor field is not provided', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/1/transacoes')
      .body({
        tipo: 'c',
        descricao: 'Teste',
      })
    expect(JSON.parse(response.body).message).toBe(
      "body must have required property 'valor'",
    )
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 422 when descricao is an empty string', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/1/transacoes')
      .body({
        valor: 100,
        tipo: 'c',
        descricao: '',
      })
    expect(JSON.parse(response.body).message).toBe(
      'body/descricao must NOT have fewer than 1 characters',
    )
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 422 when clientId is an invalid argument', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/wrong/transacoes')
      .body({
        valor: 100,
        tipo: 'c',
        descricao: 'Teste',
      })
    expect(JSON.parse(response.body).message).toBe(
      'params/clientId must match pattern "^\\d+$"',
    )
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 422 when valor field is zero', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/1/transacoes')
      .body({
        valor: 0,
        tipo: 'c',
        descricao: 'Teste',
      })
    expect(JSON.parse(response.body).message).toBe('body/valor must be >= 1')
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 422 when valor field is zero', async () => {
    const response: { body: string; statusCode: number } = await fastify
      .inject()
      .post('/clientes/1/transacoes')
      .body({
        valor: -10,
        tipo: 'c',
        descricao: 'Teste',
      })
    expect(JSON.parse(response.body).message).toBe('body/valor must be >= 1')
    expect(response.statusCode).toBe(422)
  })

  test('should return statusCode 200 with right balance and limit on body', async () => {
    const response = await fastify
      .inject()
      .post('/clientes/2/transacoes')
      .body({
        valor: 20000,
        tipo: 'c',
        descricao: 'Teste',
      })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ saldo: 20000, limite: 80000 })
  })

  test('should return statusCode 200 and negative "saldo"', async () => {
    const response = await fastify
      .inject()
      .post('/clientes/2/transacoes')
      .body({
        valor: 20000,
        tipo: 'd',
        descricao: 'Teste',
      })
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ saldo: -20000, limite: 80000 })
  })

  test('should return statusCode 422 if customer did not have limit', async () => {
    const response = await fastify
      .inject()
      .post('/clientes/2/transacoes')
      .body({
        valor: 100000,
        tipo: 'd',
        descricao: 'Teste',
      })
    expect(response.statusCode).toBe(422)
    expect(JSON.parse(response.body)).toEqual({ message: 'WITHOUT_LIMIT' })
  })
})
