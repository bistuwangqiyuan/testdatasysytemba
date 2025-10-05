import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据分析 - 深度分析实验数据与智能异常检测',
  description: '多维度趋势分析、智能异常检测、自定义报表生成、定期报告配置。支持数据导出（PDF/Excel），提供专业的数据分析解决方案，助力光伏设备性能优化。',
  keywords: '数据分析,趋势分析,异常检测,报表生成,数据导出,PDF报告,Excel导出,数据可视化',
  openGraph: {
    title: '数据分析 - 深度分析实验数据与智能异常检测',
    description: '多维度趋势分析、智能异常检测、自定义报表生成、定期报告配置。',
    type: 'website',
    url: 'https://testdatasysytemba.netlify.app/analysis',
  },
}

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
