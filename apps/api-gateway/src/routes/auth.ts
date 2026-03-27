import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jose';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

  // POST /auth/register
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.code(400).send({ error: 'User already exists' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'FREE_USER',
        subscriptionPlan: 'FREE',
      },
    });
    
    // Create credit record
    await prisma.credit.create({
      data: {
        userId: user.id,
        balance: 20, // Free tier monthly credits
      },
    });
    
    // Generate JWT
    const accessToken = await new jwt.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(new TextEncoder().encode(JWT_SECRET));
    
    reply.send({ 
      message: 'Registration successful',
      user: { id: user.id, email: user.email },
      accessToken 
    });
  });

  // POST /auth/login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const accessToken = await new jwt.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(new TextEncoder().encode(JWT_SECRET));
    
    reply.send({ 
      accessToken,
      user: { id: user.id, email: user.email, role: user.role }
    });
  });

  // POST /auth/google
  fastify.post('/google', async (request, reply) => {
    const { token } = request.body as { token: string };
    
    // TODO: Verify Google token and create/find user
    // For now, return placeholder
    reply.send({ accessToken: '', refreshToken: '' });
  });

  // POST /auth/refresh
  fastify.post('/refresh', async (request, reply) => {
    // TODO: Implement token refresh
    reply.send({ accessToken: '' });
  });

  // POST /auth/logout
  fastify.post('/logout', async (request, reply) => {
    reply.send({ message: 'Logged out' });
  });
};
