import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://testdatasysytemba.netlify.app'),
  title: {
    default: '光伏关断器实验数据管理系统 - 专业工业数据管理平台',
    template: '%s | 光伏关断器实验数据管理系统'
  },
  description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。支持批量数据导入、智能清洗、异常检测，助力光伏设备研发与优化。',
  keywords: [
    '光伏关断器',
    '实验数据管理',
    '数据分析',
    '实时监控',
    '实验仿真',
    '数据可视化',
    '光伏设备',
    '工业数据平台',
    '关断器测试',
    '光伏系统'
  ],
  authors: [{ name: '光伏关断器实验数据管理系统' }],
  creator: '光伏关断器实验数据管理系统',
  publisher: '光伏关断器实验数据管理系统',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://testdatasysytemba.netlify.app',
    siteName: '光伏关断器实验数据管理系统',
    title: '光伏关断器实验数据管理系统 - 专业工业数据管理平台',
    description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '光伏关断器实验数据管理系统',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '光伏关断器实验数据管理系统 - 专业工业数据管理平台',
    description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="color-scheme" content="dark" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}