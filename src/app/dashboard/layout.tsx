import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据展示大屏 - 实时监控光伏关断器运行状态',
  description: '实时监控光伏关断器运行状态与性能指标，提供设备在线状态、功率数据、关断时间、故障率等关键指标的可视化展示。支持实时数据更新，设备状态分布、功率曲线、故障率趋势、关断时间统计等专业数据可视化功能，助力设备运维管理。',
  keywords: ['数据大屏', '实时监控', '光伏关断器', '设备状态', '功率监控', '关断时间', '故障率', '数据可视化', '实时数据', '设备运维', '性能指标', '在线监控'],
  openGraph: {
    title: '数据展示大屏 - 实时监控光伏关断器运行状态',
    description: '实时监控光伏关断器运行状态与性能指标，提供设备在线状态、功率数据、关断时间、故障率等关键指标的可视化展示',
    url: 'https://testdatasysytemba.netlify.app/dashboard',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '数据展示大屏界面',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '数据展示大屏 - 实时监控光伏关断器运行状态',
    description: '实时监控光伏关断器运行状态与性能指标',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app/dashboard',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

