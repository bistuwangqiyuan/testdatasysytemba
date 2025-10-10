import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据分析 - 深度分析实验数据与智能异常检测',
  description: '深度分析光伏关断器实验数据，生成专业分析报表。多维度趋势分析、智能异常检测、自定义报表生成、定期报告配置。支持趋势分析、异常检测、相关性分析等功能，提供数据筛选、可视化图表、报告导出等工具，支持数据导出（PDF/Excel），提供专业的数据分析解决方案，助力光伏设备性能优化与科研决策。',
  keywords: ['数据分析', '趋势分析', '异常检测', '报表生成', '数据导出', 'PDF报告', 'Excel导出', '数据可视化', '统计分析', '相关性分析', '数据报告', '科研分析'],
  openGraph: {
    title: '数据分析 - 深度分析实验数据与智能异常检测',
    description: '深度分析光伏关断器实验数据，生成专业分析报表。多维度趋势分析、智能异常检测、自定义报表生成',
    url: 'https://testdatasysytemba.netlify.app/analysis',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '数据分析界面',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '数据分析 - 深度分析实验数据与智能异常检测',
    description: '深度分析光伏关断器实验数据，生成专业分析报表',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app/analysis',
  },
}

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

