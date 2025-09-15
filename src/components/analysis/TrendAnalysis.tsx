'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { AnalysisFilter } from '@/app/analysis/page'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Props {
  filters: AnalysisFilter
}

interface TrendData {
  time: string
  voltage: number
  current: number
  power: number
  efficiency: number
}

export default function TrendAnalysis({ filters }: Props) {
  const [data, setData] = useState<TrendData[]>([])
  const [statistics, setStatistics] = useState({
    voltageTrend: 0,
    currentTrend: 0,
    powerTrend: 0,
    efficiencyTrend: 0,
  })

  useEffect(() => {
    generateTrendData()
  }, [filters])

  const generateTrendData = () => {
    // Generate mock trend data
    const days = Math.ceil((filters.dateRange.end.getTime() - filters.dateRange.start.getTime()) / (1000 * 60 * 60 * 24))
    const newData: TrendData[] = []
    
    for (let i = 0; i < Math.min(days, 30); i++) {
      const date = new Date(filters.dateRange.start.getTime() + i * 24 * 60 * 60 * 1000)
      newData.push({
        time: format(date, 'MM/dd', { locale: zhCN }),
        voltage: 220 + Math.random() * 20 + i * 0.5,
        current: 10 + Math.random() * 5 + i * 0.1,
        power: 2000 + Math.random() * 500 + i * 10,
        efficiency: 85 + Math.random() * 10 + i * 0.2,
      })
    }
    
    setData(newData)
    
    // Calculate trends
    if (newData.length > 1) {
      const last = newData[newData.length - 1]
      const first = newData[0]
      setStatistics({
        voltageTrend: ((last.voltage - first.voltage) / first.voltage) * 100,
        currentTrend: ((last.current - first.current) / first.current) * 100,
        powerTrend: ((last.power - first.power) / first.power) * 100,
        efficiencyTrend: ((last.efficiency - first.efficiency) / first.efficiency) * 100,
      })
    }
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 1) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend < -1) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const metrics = [
    { key: 'voltage', label: '电压', color: '#3b82f6', trend: statistics.voltageTrend },
    { key: 'current', label: '电流', color: '#06b6d4', trend: statistics.currentTrend },
    { key: 'power', label: '功率', color: '#f59e0b', trend: statistics.powerTrend },
    { key: 'efficiency', label: '效率', color: '#10b981', trend: statistics.efficiencyTrend },
  ]

  return (
    <div className="space-y-6">
      {/* Trend Summary */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">趋势概览</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.key} className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{metric.label}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <p className="text-xl font-bold" style={{ color: metric.color }}>
                {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">趋势图表</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              {filters.dataTypes.includes('voltage') && (
                <Line 
                  type="monotone" 
                  dataKey="voltage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  name="电压 (V)"
                />
              )}
              {filters.dataTypes.includes('current') && (
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={false}
                  name="电流 (A)"
                />
              )}
              {filters.dataTypes.includes('power') && (
                <Line 
                  type="monotone" 
                  dataKey="power" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={false}
                  name="功率 (W)"
                  yAxisId="right"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Moving Average */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">移动平均分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5">
            <p className="text-sm text-gray-400 mb-2">7日移动平均</p>
            <p className="text-2xl font-bold text-blue-400">2,245.8 W</p>
            <p className="text-xs text-gray-500 mt-1">功率平均值</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5">
            <p className="text-sm text-gray-400 mb-2">30日移动平均</p>
            <p className="text-2xl font-bold text-cyan-400">2,198.3 W</p>
            <p className="text-xs text-gray-500 mt-1">功率平均值</p>
          </div>
        </div>
      </div>
    </div>
  )
}