import Link from 'next/link';

export default function Dashboard() {
  const features = [
    {
      title: 'Text to Image',
      description: 'Generate stunning images from text descriptions',
      icon: '🎨',
      href: '/generate/image',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Text to Video',
      description: 'Create videos from simple text prompts',
      icon: '🎬',
      href: '/generate/video',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI Text Generator',
      description: 'Generate scripts, captions, and copy with AI',
      icon: '✍️',
      href: '/generate/text',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Image to Video',
      description: 'Animate your images into videos',
      icon: '✨',
      href: '/generate/image-to-video',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-[#E94560]">NOVA AI</span>
          </h1>
          <p className="text-xl text-gray-300">
            Create stunning content with AI-powered generation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#E94560]/50 transition-all hover:transform hover:scale-105"
            >
              <div className={`text-5xl mb-4 bg-gradient-to-r ${feature.color} w-20 h-20 rounded-full flex items-center justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#E94560] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">🎉 All Systems Operational</h3>
            <p className="text-gray-400 text-sm">
              ✅ API Connected • ✅ Models Ready • ✅ Free Tier Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
