import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://testdatasysytemba.netlify.app'
  const currentDate = new Date()
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/simulation`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/data-management`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/analysis`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ]
}
