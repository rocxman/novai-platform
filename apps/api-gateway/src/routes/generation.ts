import { FastifyPluginAsync } from 'fastify';

export const generationRoutes: FastifyPluginAsync = async (fastify) => {
  const GENERATION_SERVICE_URL = process.env.GENERATION_SERVICE_URL || 'http://localhost:8000';

  // POST /generate/text-to-video
  fastify.post('/text-to-video', async (request, reply) => {
    const { prompt, duration, resolution, aspectRatio, style, negativePrompt } = request.body as {
      prompt: string;
      duration: number;
      resolution: string;
      aspectRatio: string;
      style: string;
      negativePrompt?: string;
    };
    
    // Call generation service
    const response = await fetch(`${GENERATION_SERVICE_URL}/generate/video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        duration,
        resolution: resolution === '4k' ? '1920*1080' : resolution === '1080p' ? '1280*720' : '1280*720',
        negative_prompt: negativePrompt,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const result = await response.json();
    
    reply.code(202).send({
      job_id: 'job_' + Date.now(),
      status: 'completed',
      result: result.result,
      credits_to_be_used: 10,
    });
  });

  // POST /generate/text-to-image
  fastify.post('/text-to-image', async (request, reply) => {
    const { prompt, variations, resolution, style, negativePrompt } = request.body as {
      prompt: string;
      variations: number;
      resolution: string;
      style: string;
      negativePrompt?: string;
    };
    
    // Call generation service
    const response = await fetch(`${GENERATION_SERVICE_URL}/generate/image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        variations: variations || 1,
        resolution: resolution || '1024*1024',
        style,
        negative_prompt: negativePrompt,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const result = await response.json();
    
    reply.send({
      job_id: 'job_' + Date.now(),
      status: 'completed',
      results: result.results,
      credits_to_be_used: variations * 2,
    });
  });

  // POST /generate/image-to-video
  fastify.post('/image-to-video', async (request, reply) => {
    const { imageUrl, motionPrompt, duration } = request.body as {
      imageUrl: string;
      motionPrompt: string;
      duration: number;
    };
    
    // Call generation service
    const response = await fetch(`${GENERATION_SERVICE_URL}/generate/image-to-video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        motion_prompt: motionPrompt,
        duration: duration || 5,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const result = await response.json();
    
    reply.code(202).send({
      job_id: 'job_' + Date.now(),
      status: 'completed',
      result: result.result,
      credits_to_be_used: 7,
    });
  });

  // POST /generate/text
  fastify.post('/text', async (request, reply) => {
    const { prompt, template, tone } = request.body as {
      prompt: string;
      template: string;
      tone: string;
    };
    
    // Call generation service
    const response = await fetch(`${GENERATION_SERVICE_URL}/generate/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        template,
        tone,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const result = await response.json();
    
    reply.send({ result: result.result, model: result.model });
  });

  // GET /generate/jobs/:jobId
  fastify.get('/jobs/:jobId', async (request, reply) => {
    const { jobId } = request.params as { jobId: string };
    
    // TODO: Get job status from database
    
    reply.send({
      job_id: jobId,
      status: 'completed',
      result: {},
    });
  });

  // GET /generate/jobs
  fastify.get('/jobs', async (request, reply) => {
    // TODO: List user's jobs from database
    
    reply.send({ jobs: [] });
  });
};
