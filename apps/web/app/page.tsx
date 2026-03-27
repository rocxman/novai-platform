import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0F3460]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-white">
            Create Stunning Videos with{' '}
            <span className="text-[#E94560]">AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into professional videos and images using
            cutting-edge AI. No editing skills required.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#E94560] hover:bg-[#d63850] text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Start Creating Free
            </Link>
            <Link
              href="#features"
              className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Text to Video"
            description="Generate 3-60 second videos from simple text prompts"
            icon="🎬"
          />
          <FeatureCard
            title="Text to Image"
            description="Create stunning HD images with AI"
            icon="🎨"
          />
          <FeatureCard
            title="Image to Video"
            description="Animate your static images into videos"
            icon="✨"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 NOVA AI Platform. Powered by Google AI Studio.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#E94560]/50 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
