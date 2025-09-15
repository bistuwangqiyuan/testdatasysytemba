'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Database, BarChart3 } from 'lucide-react'
import { AnalysisFilter } from '@/app/analysis/page'
import { supabase } from '@/lib/supabase'

interface Props {
  filters: AnalysisFilter
}

interface SummaryStats {
  totalDataPoints: number
  anomalyCount: number
  avgEfficiency: number
  trendDirection: 'up' | 'down' | 'stable'
}

export default function AnalysisSummary({ filters }: Props) {
  const [stats, setStats] = useState<SummaryStats>({
    totalDataPoints: 0,
    anomalyCount: 0,
    avgEfficiency: 0,
    trendDirection: 'stable',
  })

  useEffect(() => {
    fetchSummaryStats()
  }, [filters])

  const fetchSummaryStats = async () => {
    try {
      // Fetch data points count
      const { count: dataCount } = await supabase
        .from('experiment_data')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', filters.dateRange.start.toISOString())
        .lte('timestamp', filters.dateRange.end.toISOString())

      // Fetch anomaly count
      const { count: anomalyCount } = await supabase
        .from('anomaly_records')
        .select('*', { count: 'exact', head: true })
        .gte('detected_at', filters.dateRange.start.toISOString())
        .lte('detected_at', filters.dateRange.end.toISOString())

      // Mock efficiency and trend for demo
      const avgEfficiency = 85 + Math.random() * 10
      const trendDirection = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'

      setStats({
        totalDataPoints: dataCount || 0,
        anomalyCount: anomalyCount || 0,
        avgEfficiency,
        trendDirection: trendDirection as any,
      })
    } catch (error) {
      console.error('Error fetching summary stats:', error)
    }
  }

  const cards = [
    {
      title: '数据点总数',
      value: stats.totalDataPoints.toLocaleString(),
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      delay: 0,
    },
    {
      title: '检测到异常',
      value: stats.anomalyCount,
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      delay: 0.1,
    },
    {
      title: '平均效率',
      value: `${stats.avgEfficiency.toFixed(1)}%`,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      delay: 0.2,
    },
    {
      title: '趋势方向',
      value: stats.trendDirection === 'up' ? '上升' : stats.trendDirection === 'down' ? '下降' : '稳定',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
      delay: 0.3,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.delay }}
          className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 bg-gradient-to-r ${card.color} text-white`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}