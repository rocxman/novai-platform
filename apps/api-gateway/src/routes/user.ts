import { FastifyPluginAsync } from 'fastify';

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /users/me
  fastify.get('/me', async (request, reply) => {
    // TODO: Get current user profile
    
    reply.send({
      id: 'uuid',
      email: 'user@example.com',
      name: 'User',
      role: 'FREE_USER',
    });
  });

  // PATCH /users/me
  fastify.patch('/me', async (request, reply) => {
    const { name, avatarUrl } = request.body as { name?: string; avatarUrl?: string };
    
    // TODO: Update user profile
    
    reply.send({ message: 'Profile updated' });
  });
};
