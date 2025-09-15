'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react'

interface Metric {
  label: string
  value: string | number
  unit: string
  icon: any
  color: string
  change: number
}

export default function RealtimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: '累计发电量',
      value: 0,
      unit: 'MWh',
      icon: Zap,
      color: 'text-yellow-500',
      change: 0,
    },
    {
      label: '平均效率',
      value: 0,
      unit: '%',
      icon: TrendingUp,
      color: 'text-green-500',
      change: 0,
    },
    {
      label: 'MTBF',
      value: 0,
      unit: '小时',
      icon: Activity,
      color: 'text-blue-500',
      change: 0,
    },
    {
      label: '异常事件',
      value: 0,
      unit: '次',
      icon: AlertCircle,
      color: 'text-red-500',
      change: 0,
    },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.label === '累计发电量' 
          ? (parseFloat(metric.value.toString()) + Math.random() * 0.1).toFixed(2)
          : metric.label === '平均效率'
          ? (85 + Math.random() * 10).toFixed(1)
          : metric.label === 'MTBF'
          ? Math.floor(1000 + Math.random() * 200)
          : Math.floor(Math.random() * 5),
        change: (Math.random() - 0.5) * 10,
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass rounded-xl p-6 h-[350px]">
      <h3 className="text-xl font-semibold mb-6">实时指标</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/10 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{metric.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
              </div>
            </div>
            <div className={`text-sm ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}