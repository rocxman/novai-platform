import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import { config } from './config.js';
import { authRoutes } from './routes/auth.js';
import { generationRoutes } from './routes/generation.js';
import { userRoutes } from './routes/user.js';
import { creditRoutes } from './routes/credit.js';
import { billingRoutes } from './routes/billing.js';
import { assetRoutes } from './routes/asset.js';

const fastify = Fastify({
  logger: {
    level: config.logLevel,
  },
});

// Register plugins
await fastify.register(cors, {
  origin: config.appUrl,
  credentials: true,
});

await fastify.register(jwt, {
  secret: config.jwtSecret,
  sign: {
    expiresIn: '15m',
  },
});

await fastify.register(cookie, {
  secret: config.jwtSecret,
});

await fastify.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

await fastify.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
});

// Register routes
await fastify.register(authRoutes, { prefix: '/api/v1/auth' });
await fastify.register(generationRoutes, { prefix: '/api/v1/generate' });
await fastify.register(userRoutes, { prefix: '/api/v1/users' });
await fastify.register(creditRoutes, { prefix: '/api/v1/credits' });
await fastify.register(billingRoutes, { prefix: '/api/v1/billing' });
await fastify.register(assetRoutes, { prefix: '/api/v1/assets' });

// Health check
fastify.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ error: 'Not Found' });
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.code(error.statusCode || 500).send({
    error: error.name,
    message: error.message,
  });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`🚀 API Gateway running on http://localhost:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
