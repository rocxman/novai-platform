import { FastifyPluginAsync } from 'fastify';

export const billingRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /billing/plans
  fastify.get('/plans', async (request, reply) => {
    reply.send({
      plans: [
        { name: 'Free', price: 0, credits: 20 },
        { name: 'Pro', price: 99000, credits: 300 },
        { name: 'Enterprise', price: 'custom', credits: 'custom' },
      ],
    });
  });

  // POST /billing/checkout
  fastify.post('/checkout', async (request, reply) => {
    const { planId } = request.body as { planId: string };
    
    // TODO: Create Midtrans payment session
    
    reply.send({ checkoutUrl: '' });
  });

  // POST /billing/webhook
  fastify.post('/webhook', async (request, reply) => {
    // TODO: Handle Midtrans webhook
    
    reply.send({ received: true });
  });
};
