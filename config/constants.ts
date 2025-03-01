/**
 * Application-wide constants
 */

// Feature flags
export const FEATURES = {
  ENABLE_COMMENTS: true,
  ENABLE_ANALYTICS: true,
};

// Content limits
export const LIMITS = {
  POST_EXCERPT_LENGTH: 100,
  // MAX_UPLOAD_SIZE_MB: 5,
  // MAX_TAGS_PER_POST: 5,
};

// Route paths
export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  LOGIN: '/login',
  ADMIN: '/owner',
  PRODUCTS: '/products',
  PUBLICATIONS: '/publications',
  PHOTOS: '/photos',
  CHECKOUT: '/checkout',
};

// API endpoints
export const API = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
  },
  BLOG: {
    POSTS: '/api/v1/posts',
    STATS: '/api/v1/stats',
  },
  SHOP: {
    CHECKOUT: '/api/v1/create-checkout-session',
    VERIFY: '/api/v1/verify-session',
    WEBHOOKS: '/api/v1/webhooks',
  },
};