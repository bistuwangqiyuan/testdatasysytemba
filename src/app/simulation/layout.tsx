import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '实验仿真 - 光伏关断器性能测试与模拟平台',
  description: '模拟不同工况下的光伏关断器工作状态，预测设备性能表现。实时显示电压电流波形，支持关断控制模拟（标准输出：45V、12A）。可调节电压、电流、温度、光照强度等仿真参数，支持电压、电流、功率等参数设置，实时显示波形与仿真结果，助力产品研发与优化。',
  keywords: ['实验仿真', '光伏关断器', '性能测试', '电压电流波形', '关断控制', '仿真参数', '波形显示', '参数设置', '产品研发', '性能预测', '工况模拟'],
  openGraph: {
    title: '实验仿真 - 光伏关断器性能测试与模拟平台',
    description: '模拟不同工况下的光伏关断器工作状态，实时显示电压电流波形，支持关断控制模拟',
    url: 'https://testdatasysytemba.netlify.app/simulation',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '实验仿真界面',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '实验仿真 - 光伏关断器性能测试与模拟平台',
    description: '模拟不同工况下的光伏关断器工作状态，实时显示电压电流波形',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app/simulation',
  },
}

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

