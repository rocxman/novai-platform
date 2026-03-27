// ============================================
// USER & AUTH
// ============================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  subscriptionPlan: Plan;
  avatarUrl: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Role = 'FREE_USER' | 'PRO_USER' | 'ENTERPRISE_USER' | 'ADMIN' | 'SUPERADMIN';

export type Plan = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

// ============================================
// CREDITS & BILLING
// ============================================

export interface CreditBalance {
  balance: number;
  reserved: number;
  available: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  creditDelta: number;
  paymentMethod: string | null;
  status: string;
  createdAt: string;
}

export interface PricingPlan {
  name: string;
  price: number | string;
  credits: number | string;
  features: string[];
}

// ============================================
// GENERATION
// ============================================

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';

export type JobType = 'text-to-video' | 'text-to-image' | 'image-to-video' | 'text';

export interface GenerationJob {
  id: string;
  userId: string;
  jobType: JobType;
  status: JobStatus;
  prompt: string;
  params: GenerationParams;
  resultUrl: string | null;
  thumbnailUrl: string | null;
  creditsUsed: number | null;
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface GenerationParams {
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
  style?: string;
  negativePrompt?: string;
  variations?: number;
  seed?: number;
}

export interface VideoGenerationParams {
  prompt: string;
  duration: number; // 5, 10, 15, 30
  resolution: '720p' | '1080p' | '4k';
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
  style: 'cinematic' | 'anime' | '3d' | 'realistic' | 'watercolor';
  negativePrompt?: string;
  seed?: number;
}

export interface ImageGenerationParams {
  prompt: string;
  variations: number; // 1-4
  resolution: '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  style: 'photorealistic' | 'illustration' | 'painting' | 'sketch';
}

export interface TextGenerationParams {
  prompt: string;
  template: 'video_script' | 'social_caption' | 'ad_copy' | 'blog_post';
  tone: 'professional' | 'casual' | 'funny' | 'persuasive';
  context?: string;
  keywords?: string[];
}

// ============================================
// ASSETS
// ============================================

export interface Asset {
  id: string;
  userId: string;
  jobId: string | null;
  type: 'video' | 'image' | 'text';
  filename: string;
  gcsPath: string;
  cdnUrl: string;
  size: number;
  duration: number | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface JobSubmissionResponse {
  job_id: string;
  status: 'queued';
  estimated_wait_seconds: number;
  credits_to_be_used: number;
  stream_url: string;
}

export interface JobStatusResponse {
  job_id: string;
  status: JobStatus;
  result?: {
    video_url?: string;
    image_url?: string;
    text?: string;
    thumbnail_url?: string;
    duration?: number;
    resolution?: string;
  };
  credits_used: number;
  created_at: string;
  completed_at: string | null;
}

// ============================================
// SUBSCRIPTION
// ============================================

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

// ============================================
// API KEYS
// ============================================

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  permissions: string[];
  rateLimit: number;
  lastUsed: string | null;
  createdAt: string;
}
