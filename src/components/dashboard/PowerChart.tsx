'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface PowerData {
  time: string
  power: number
  voltage: number
  current: number
}

export default function PowerChart() {
  const [data, setData] = useState<PowerData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPowerData()
    
    // Update every 5 seconds
    const interval = setInterval(fetchPowerData, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchPowerData = async () => {
    try {
      const { data: experimentData } = await supabase
        .from('experiment_data')
        .select('timestamp, power, voltage, current')
        .order('timestamp', { ascending: false })
        .limit(24)

      if (experimentData) {
        const formattedData = experimentData.reverse().map(item => ({
          time: format(new Date(item.timestamp), 'HH:mm', { locale: zhCN }),
          power: Number(item.power),
          voltage: Number(item.voltage),
          current: Number(item.current),
        }))
        
        setData(formattedData)
      }
    } catch (error) {
      console.error('Error fetching power data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Generate mock data if no real data
  const mockData = Array.from({ length: 24 }, (_, i) => ({
    time: format(new Date().setHours(new Date().getHours() - 23 + i), 'HH:mm'),
    power: Math.random() * 50 + 150,
    voltage: Math.random() * 10 + 220,
    current: Math.random() * 2 + 8,
  }))

  const chartData = data.length > 0 ? data : mockData

  return (
    <div className="glass rounded-xl p-6 h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">实时功率曲线</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-400">功率 (W)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
            <span className="text-gray-400">电压 (V)</span>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-400">加载中...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              yAxisId="left"
            />
            <YAxis 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              yAxisId="right"
              orientation="right"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="power"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorPower)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="voltage"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorVoltage)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}