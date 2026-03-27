'use client';

import { useState } from 'react';
import { generateVideo } from '@/lib/api';

export default function TextToVideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [resolution, setResolution] = useState('1280*720');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const result = await generateVideo(prompt, duration, resolution);
      if (result.result?.video_url) {
        setVideoUrl(result.result.video_url);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt((e.target as HTMLTextAreaElement).value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number((e.target as HTMLSelectElement).value));
  };

  const handleResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResolution((e.target as HTMLSelectElement).value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Text to Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            rows={4}
            placeholder="A cat walking in the garden, realistic, high quality, smooth motion..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duration
            </label>
            <select
              value={duration}
              onChange={handleDurationChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={15}>15 seconds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resolution
            </label>
            <select
              value={resolution}
              onChange={handleResolutionChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value="1280*720">720p (HD)</option>
              <option value="1920*1080">1080p (Full HD)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E94560] hover:bg-[#d63850] disabled:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Generating Video...' : 'Generate Video'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {videoUrl && (
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <video src={videoUrl} controls className="w-full" />
          <a
            href={videoUrl}
            download="generated-video.mp4"
            className="block text-center bg-[#E94560]/20 hover:bg-[#E94560]/30 text-[#E94560] font-medium py-3 transition-colors"
          >
            Download Video
          </a>
          <p className="text-center text-gray-400 text-sm mt-2 px-4">
            ⚠️ Video URL valid for 24 hours only
          </p>
        </div>
      )}
    </div>
  );
}
