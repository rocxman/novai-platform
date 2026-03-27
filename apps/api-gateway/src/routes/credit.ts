import { FastifyPluginAsync } from 'fastify';

export const creditRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /credits/balance
  fastify.get('/balance', async (request, reply) => {
    // TODO: Get credit balance
    
    reply.send({
      balance: 20,
      reserved: 0,
      available: 20,
    });
  });

  // GET /credits/history
  fastify.get('/history', async (request, reply) => {
    // TODO: Get credit history
    
    reply.send({ transactions: [] });
  });
};
