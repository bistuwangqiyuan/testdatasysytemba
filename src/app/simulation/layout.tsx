import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '实验仿真 - 光伏关断器性能测试平台',
  description: '模拟不同条件下的光伏关断器工作状态，实时显示电压电流波形，支持关断控制模拟（标准输出：45V、12A）。可调节电压、电流、温度、光照强度等仿真参数。',
  keywords: '实验仿真,光伏关断器,性能测试,电压电流波形,关断控制,仿真参数,波形显示',
  openGraph: {
    title: '实验仿真 - 光伏关断器性能测试平台',
    description: '模拟不同条件下的光伏关断器工作状态，实时显示电压电流波形。',
    type: 'website',
    url: 'https://testdatasysytemba.netlify.app/simulation',
  },
}

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
