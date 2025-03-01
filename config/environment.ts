/**
 * Environment configuration
 * Provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  // Node environment
  NODE_ENV: 'development' | 'production' | 'test';
  
  // App URLs
  APP_URL: string;
  
  // Auth
  JWT_SECRET_KEY: string;
  OWNER_USERNAME: string;
  OWNER_PASSWORD: string;
  
  // Stripe
  STRIPE_SECRET_KEY: string;
  // STRIPE_PUBLISHABLE_KEY: string;
  // STRIPE_WEBHOOK_SECRET: string;
}

// Default values for local development (non-sensitive)
const defaultConfig: Partial<EnvironmentConfig> = {
  NODE_ENV: 'development',
  APP_URL: 'http://localhost:3000',
};

// Load environment variables with fallbacks to defaults
export const env: EnvironmentConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvironmentConfig['NODE_ENV']) || defaultConfig.NODE_ENV!,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || defaultConfig.APP_URL!,
  
  // Auth (no defaults for sensitive data)
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  OWNER_USERNAME: process.env.OWNER_USERNAME || '',
  OWNER_PASSWORD: process.env.OWNER_PASSWORD || '',
  
  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  // STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
};

// Validate required environment variables
export function validateEnv(): { valid: boolean; missing: string[] } {
  const requiredVars = [
    'JWT_SECRET_KEY',
    'OWNER_USERNAME',
    'OWNER_PASSWORD',
    'STRIPE_SECRET_KEY',
    // 'STRIPE_PUBLISHABLE_KEY',
    // 'STRIPE_WEBHOOK_SECRET',
  ];
  
  const missing = requiredVars.filter(key => !env[key as keyof EnvironmentConfig]);
  
  return {
    valid: missing.length === 0,
    missing,
  };
}