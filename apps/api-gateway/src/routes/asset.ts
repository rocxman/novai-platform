import { FastifyPluginAsync } from 'fastify';

export const assetRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /assets
  fastify.get('/', async (request, reply) => {
    // TODO: List user assets
    
    reply.send({ assets: [] });
  });

  // GET /assets/:id
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    // TODO: Get asset by ID
    
    reply.send({ asset: {} });
  });

  // DELETE /assets/:id
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    // TODO: Delete asset
    
    reply.send({ message: 'Deleted' });
  });
};
