import { FastifyPluginAsync } from 'fastify';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /auth/register
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    // TODO: Implement registration logic
    
    reply.send({ message: 'Registration successful' });
  });

  // POST /auth/login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    // TODO: Implement login logic
    
    reply.send({ accessToken: '', refreshToken: '' });
  });

  // POST /auth/google
  fastify.post('/google', async (request, reply) => {
    const { token } = request.body as { token: string };
    
    // TODO: Implement Google OAuth logic
    
    reply.send({ accessToken: '', refreshToken: '' });
  });

  // POST /auth/refresh
  fastify.post('/refresh', async (request, reply) => {
    // TODO: Implement token refresh
    
    reply.send({ accessToken: '' });
  });

  // POST /auth/logout
  fastify.post('/logout', async (request, reply) => {
    // TODO: Implement logout
    
    reply.send({ message: 'Logged out' });
  });
};
