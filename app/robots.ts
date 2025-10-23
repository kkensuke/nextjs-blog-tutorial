import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/owner',
          '/owner/*',
          '/api/',
          '/login',
          // Uncomment if you enable products feature
          // '/checkout',
          // '/success',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}