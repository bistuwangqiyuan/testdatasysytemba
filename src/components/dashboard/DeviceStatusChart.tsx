'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { supabase } from '@/lib/supabase'

interface StatusData {
  name: string
  value: number
  color: string
}

export default function DeviceStatusChart() {
  const [data, setData] = useState<StatusData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatusData()
    
    // Set up real-time subscription
    const channel = supabase
      .channel('device-status')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'devices' },
        () => fetchStatusData()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchStatusData = async () => {
    try {
      const { data: devices } = await supabase
        .from('devices')
        .select('status')

      if (devices) {
        const statusCount = devices.reduce((acc, device) => {
          acc[device.status] = (acc[device.status] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        const formattedData: StatusData[] = [
          { name: '在线', value: statusCount.online || 0, color: '#10b981' },
          { name: '离线', value: statusCount.offline || 0, color: '#6b7280' },
          { name: '关断', value: statusCount.shutdown || 0, color: '#f59e0b' },
        ]

        setData(formattedData)
      }
    } catch (error) {
      console.error('Error fetching status data:', error)
    } finally {
      setLoading(false)
    }
  }

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="glass rounded-xl p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-6">设备状态分布</h3>
      
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-400">加载中...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: string, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value}: {entry.payload.value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}