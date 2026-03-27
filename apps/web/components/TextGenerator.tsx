'use client';

import { useState } from 'react';
import { generateText } from '@/lib/api';

export default function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [template, setTemplate] = useState('video_script');
  const [tone, setTone] = useState('professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await generateText(prompt, template, tone);
      setResult(response.result || '');
    } catch (err: any) {
      setError(err.message || 'Failed to generate text');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt((e.target as HTMLTextAreaElement).value);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplate((e.target as HTMLSelectElement).value);
  };

  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTone((e.target as HTMLSelectElement).value);
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      (navigator as any).clipboard.writeText(result);
      if (typeof alert !== 'undefined') alert('Copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">AI Text Generator</h1>
      
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
            placeholder="Write a video script about AI technology..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Template
            </label>
            <select
              value={template}
              onChange={handleTemplateChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value="video_script">Video Script</option>
              <option value="social_caption">Social Media Caption</option>
              <option value="ad_copy">Ad Copy</option>
              <option value="blog_post">Blog Post</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={tone}
              onChange={handleToneChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E94560]"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="funny">Funny</option>
              <option value="persuasive">Persuasive</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E94560] hover:bg-[#d63850] disabled:bg-gray-600 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Result</h3>
            <button
              onClick={copyToClipboard}
              className="bg-[#E94560]/20 hover:bg-[#E94560]/30 text-[#E94560] px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="bg-black/20 rounded-lg p-4 text-gray-200 whitespace-pre-wrap font-mono text-sm">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
