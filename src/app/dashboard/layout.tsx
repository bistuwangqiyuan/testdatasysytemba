import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据展示大屏 - 实时监控光伏关断器',
  description: '实时监控光伏关断器运行状态，展示关键性能指标。包括设备状态分布、功率曲线、故障率趋势、关断时间统计等专业数据可视化功能。',
  keywords: '数据大屏,实时监控,光伏关断器,设备状态,功率曲线,故障率,关断时间,数据可视化',
  openGraph: {
    title: '数据展示大屏 - 实时监控光伏关断器',
    description: '实时监控光伏关断器运行状态，展示关键性能指标。',
    type: 'website',
    url: 'https://testdatasysytemba.netlify.app/dashboard',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
