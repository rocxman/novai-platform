'use client';

import { useState } from 'react';
import { generateImage } from '@/lib/api';

export default function TextToImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [variations, setVariations] = useState(1);
  const [resolution, setResolution] = useState('1024*1024');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages([]);

    try {
      const result = await generateImage(prompt, variations, resolution);
      if (result.results && result.results.length > 0) {
        setImages(result.results.map((r: any) => r.image_url));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Text to Image</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            rows={4}
            placeholder="A cute cat playing with a ball, photorealistic, high quality..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Variations
            </label>
            <select
              value={variations}
              onChange={(e) => setVariations(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value={1}>1 Image</option>
              <option value={2}>2 Images</option>
              <option value={3}>3 Images</option>
              <option value={4}>4 Images</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resolution
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value="512*512">512x512</option>
              <option value="1024*1024">1024x1024</option>
              <option value="1024*1792">1024x1792 (Portrait)</option>
              <option value="1792*1024">1792x1024 (Landscape)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E94560] hover:bg-[#d63850] disabled:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((url, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <img src={url} alt={`Generated ${index + 1}`} className="w-full h-auto" />
              <a
                href={url}
                download={`generated-${index + 1}.png`}
                className="block text-center bg-[#E94560]/20 hover:bg-[#E94560]/30 text-[#E94560] font-medium py-2 transition-colors"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
