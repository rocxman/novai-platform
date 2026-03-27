import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'NOVA AI Platform - AI-Powered Creative Generation',
  description:
    'Create stunning videos and images with AI. Text to Video, Text to Image, Image to Video generation powered by Google AI Studio.',
  keywords: [
    'AI',
    'video generation',
    'image generation',
    'text to video',
    'Google AI',
    'creative tools',
  ],
  authors: [{ name: 'NOVA AI Team' }],
  openGraph: {
    title: 'NOVA AI Platform',
    description: 'AI-Powered Creative Generation',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA AI Platform',
    description: 'AI-Powered Creative Generation',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
