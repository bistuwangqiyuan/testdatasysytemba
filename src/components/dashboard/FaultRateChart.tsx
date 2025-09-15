'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface FaultData {
  date: string
  rate: number
  count: number
}

export default function FaultRateChart() {
  const [data, setData] = useState<FaultData[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch from Supabase
    const mockData: FaultData[] = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i)
      return {
        date: format(date, 'MM/dd', { locale: zhCN }),
        rate: Math.random() * 5 + 1,
        count: Math.floor(Math.random() * 10 + 2),
      }
    })
    setData(mockData)
  }, [])

  return (
    <div className="glass rounded-xl p-6 h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">故障率趋势</h3>
        <span className="text-sm text-gray-400">最近7天</span>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            stroke="#64748b"
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, 10]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: any, name: string) => {
              if (name === 'rate') return [`${value.toFixed(2)}%`, '故障率']
              return [value, '故障数']
            }}
          />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}