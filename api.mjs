import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fetchWeather } from './modules/weather.mjs';

const fastify = Fastify({
  logger: true
})

const AllowedOrigins = [
  'http://localhost:5173',
  'https://emerson.run'
]

await fastify.register(cors, {
  // put your options here
  origin: AllowedOrigins
})

// Declare a route
fastify.get('/heartbeat', function handler(request, reply) {
  reply.send({
    message: `To call for hands of above, to lean on Wouldn't be good enough for me, no`
  })
})

fastify.get('/weather', async function handler(req, reply) {
  const location = req.query.location || 'Florianópolis, Santa Catarina, Brazil';

  const response = await fetchWeather(location);


  reply.send(response);
});


// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
