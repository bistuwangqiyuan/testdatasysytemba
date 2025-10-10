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
  description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。支持批量数据导入、智能清洗、异常检测，助力光伏设备研发与优化。高效的工业级数据处理系统，为光伏行业提供全方位技术支持。',
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
    '光伏系统',
    '数据管理系统',
    'PV断路器',
    '太阳能设备',
    '设备监控',
    '实时数据分析',
    '异常检测',
    '数据清洗',
    '实验管理',
    '光伏监控平台',
    '智能电网'
  ],
  authors: [{ name: '光伏关断器实验数据管理系统', url: 'https://testdatasysytemba.netlify.app' }],
  creator: '光伏关断器实验数据管理系统',
  publisher: '光伏关断器实验数据管理系统',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。支持批量数据导入、智能清洗、异常检测，助力光伏设备研发与优化。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '光伏关断器实验数据管理系统 - 数据展示大屏界面',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PVDataSystem',
    title: '光伏关断器实验数据管理系统 - 专业工业数据管理平台',
    description: '专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。',
    images: ['/og-image.jpg'],
    creator: '@PVDataSystem',
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app',
    languages: {
      'zh-CN': 'https://testdatasysytemba.netlify.app',
    },
  },
  category: 'technology',
  classification: 'Business & Industrial',
  referrer: 'origin-when-cross-origin',
  applicationName: '光伏关断器实验数据管理系统',
  appleWebApp: {
    capable: true,
    title: '光伏数据系统',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
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
        <link rel="preconnect" href="https://zzyueuweeoakopuuwfau.supabase.co" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//zzyueuweeoakopuuwfau.supabase.co" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e3a8a" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="光伏数据系统" />
        <meta name="application-name" content="光伏关断器实验数据管理系统" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1e3a8a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        
        {/* Humans.txt */}
        <link type="text/plain" rel="author" href="/humans.txt" />
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