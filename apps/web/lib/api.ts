import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Text to Image
export async function generateImage(prompt: string, variations = 1, resolution = '1024*1024') {
  const response = await api.post('/generate/image', {
    prompt,
    variations,
    resolution,
    style: 'photorealistic',
  });
  return response.data;
}

// Text to Video
export async function generateVideo(prompt: string, duration = 5, resolution = '1280*720') {
  const response = await api.post('/generate/video', {
    prompt,
    duration,
    resolution,
  });
  return response.data;
}

// Text Generation
export async function generateText(prompt: string, template = 'default', tone = 'professional') {
  const response = await api.post('/generate/text', {
    prompt,
    template,
    tone,
  });
  return response.data;
}
