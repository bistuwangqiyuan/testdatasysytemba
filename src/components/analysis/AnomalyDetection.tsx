'use client'

import { useEffect, useState } from 'react'
import { AnalysisFilter } from '@/app/analysis/page'
import { AlertTriangle, Activity, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Props {
  filters: AnalysisFilter
}

interface Anomaly {
  id: string
  timestamp: Date
  deviceId: string
  type: string
  severity: 'low' | 'medium' | 'high'
  value: number
  expectedValue: number
  description: string
}

export default function AnomalyDetection({ filters }: Props) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [statistics, setStatistics] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
  })

  useEffect(() => {
    generateAnomalies()
  }, [filters])

  const generateAnomalies = () => {
    // Generate mock anomalies
    const mockAnomalies: Anomaly[] = []
    const anomalyTypes = [
      { type: '电压异常', severity: 'high' as const, description: '电压超出正常范围' },
      { type: '电流尖峰', severity: 'medium' as const, description: '电流出现异常尖峰' },
      { type: '功率波动', severity: 'low' as const, description: '功率波动超过阈值' },
      { type: '温度过高', severity: 'high' as const, description: '设备温度超过安全范围' },
    ]

    for (let i = 0; i < 20; i++) {
      const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)]
      const timestamp = new Date(
        filters.dateRange.start.getTime() + 
        Math.random() * (filters.dateRange.end.getTime() - filters.dateRange.start.getTime())
      )
      
      mockAnomalies.push({
        id: `anomaly-${i}`,
        timestamp,
        deviceId: `${Math.floor(Math.random() * 5) + 1}`,
        type: anomalyType.type,
        severity: anomalyType.severity,
        value: Math.random() * 100 + 200,
        expectedValue: 220,
        description: anomalyType.description,
      })
    }

    setAnomalies(mockAnomalies.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
    
    // Calculate statistics
    const stats = mockAnomalies.reduce((acc, anomaly) => {
      acc.total++
      acc[anomaly.severity]++
      return acc
    }, { total: 0, high: 0, medium: 0, low: 0 })
    
    setStatistics(stats)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4 text-red-500" />
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const distributionData = Object.entries(statistics)
    .filter(([key]) => key !== 'total')
    .map(([severity, count]) => ({
      severity: severity === 'high' ? '高' : severity === 'medium' ? '中' : '低',
      count,
      color: getSeverityColor(severity),
    }))

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">总异常数</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{statistics.total}</p>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">高级别</span>
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500">{statistics.high}</p>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">中级别</span>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-500">{statistics.medium}</p>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">低级别</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">{statistics.low}</p>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">异常分布</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="severity" 
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
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomaly List */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">异常记录</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="flex items-start justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(anomaly.severity)}
                <div>
                  <p className="font-medium">{anomaly.type}</p>
                  <p className="text-sm text-gray-400">{anomaly.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>设备 #{anomaly.deviceId}</span>
                    <span>{format(anomaly.timestamp, 'MM/dd HH:mm:ss', { locale: zhCN })}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  实际值: <span className="text-red-400">{anomaly.value.toFixed(1)}</span>
                </p>
                <p className="text-xs text-gray-500">
                  期望值: {anomaly.expectedValue.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}