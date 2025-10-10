import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://testdatasysytemba.netlify.app/sitemap.xml',
    host: 'https://testdatasysytemba.netlify.app',
  }
}
