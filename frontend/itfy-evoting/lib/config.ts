/**
 * Application Configuration
 * Centralized configuration for API endpoints and app settings
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.itforyouthghana.org/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 2,
    retryDelay: 1000, // 1 second
  },

  // App Information
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'ITFY E-Voting',
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Ghana's premier youth tech awards and voting platform",
    version: '1.0.0',
  },

  // Environment
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  isDevelopment: process.env.NEXT_PUBLIC_VERCEL_ENV === 'development',
  isProduction: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',

  // Feature Flags
  features: {
    enableCaching: true,
    enableAnalytics: true,
    enableNotifications: true,
    enableMobileOptimization: true,
  },

  // Pagination defaults
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  // Cache settings (in seconds)
  cache: {
    events: 5 * 60, // 5 minutes
    candidates: 2 * 60, // 2 minutes
    categories: 5 * 60, // 5 minutes
    slides: 10 * 60, // 10 minutes
    bundles: 5 * 60, // 5 minutes
    user: 1 * 60, // 1 minute
  },

  // URLs
  urls: {
    home: '/',
    events: '/events',
    categories: '/categories',
    candidates: '/nominees',
    vote: '/vote',
    admin: '/admin',
    login: '/login',
    register: '/nominate',
    candidatePortal: '/candidate-portal',
  },

  // Contact information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@itforyouthghana.org',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+233 596 244 834',
  },
} as const;

export type Config = typeof config;
