import Fastify from 'fastify'

export const fastify = Fastify({
  logger: true,
})

fastify.get('/eba', async (request, reply) => {
  return "IOUASGDUFIYGAYUSDGF"
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`⚡ Server is now listening on port 3000`)
})
