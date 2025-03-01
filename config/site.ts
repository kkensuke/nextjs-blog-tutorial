/**
 * Website metadata and settings
 */

export const SITE_CONFIG = {
  title: 'kkensuke',
  description: 'Building the future with code and creativity.',
  author: 'Ken',
  url: 'https://example.com',
  social: {
    twitter: 'https://x.com',
    github: 'https://github.com/kkensuke/nextjs-blog-tutorial',
    linkedin: 'https://linkedin.com',
    email: 'example.12345@gmail.com',
  },
  navigation: [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: '/blog' },
    { title: 'Products', path: '/products' },
    { title: 'Publications', path: '/publications' },
    { title: 'Photos', path: '/photos' },
  ],
};

export const BLOG_CONFIG = {
  postsPerPage: 10,
  featuredCategories: ['tutorial', 'tech', 'personal'],
  comment_repo: 'kkensuke/nextjs-blog-tutorial',
};

export const THEME = {
  colors: {
    primary: {
      light: '#3b82f6', // blue-500
      DEFAULT: '#2563eb', // blue-600
      dark: '#1d4ed8', // blue-700
    },
    secondary: {
      light: '#06b6d4', // cyan-500
      DEFAULT: '#0891b2', // cyan-600
      dark: '#0e7490', // cyan-700
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
};