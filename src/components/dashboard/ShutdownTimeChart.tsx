'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ShutdownData {
  range: string
  count: number
}

export default function ShutdownTimeChart() {
  const [data, setData] = useState<ShutdownData[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch from Supabase
    const mockData: ShutdownData[] = [
      { range: '0-20ms', count: 5 },
      { range: '20-40ms', count: 12 },
      { range: '40-60ms', count: 28 },
      { range: '60-80ms', count: 15 },
      { range: '80-100ms', count: 8 },
      { range: '>100ms', count: 3 },
    ]
    setData(mockData)
  }, [])

  return (
    <div className="glass rounded-xl p-6 h-[350px]">
      <h3 className="text-xl font-semibold mb-6">关断时间分布</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="range" 
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
          <Bar 
            dataKey="count" 
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}