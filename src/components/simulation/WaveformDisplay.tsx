'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { SimulationState } from '@/app/simulation/page'

interface Props {
  state: SimulationState
}

interface WaveformData {
  time: number
  voltage: number
  current: number
}

export default function WaveformDisplay({ state }: Props) {
  const [data, setData] = useState<WaveformData[]>([])

  useEffect(() => {
    if (!state.isRunning) {
      setData([])
      return
    }

    // Generate waveform data
    const newData: WaveformData[] = []
    const totalPoints = 100
    
    if (!state.isShutdown) {
      // Normal operation
      for (let i = 0; i < totalPoints; i++) {
        newData.push({
          time: i,
          voltage: state.outputVoltage + (Math.random() - 0.5) * 5,
          current: state.outputCurrent + (Math.random() - 0.5) * 0.5,
        })
      }
    } else {
      // Shutdown transition
      const shutdownPoint = 30
      
      // Before shutdown
      for (let i = 0; i < shutdownPoint; i++) {
        newData.push({
          time: i,
          voltage: state.outputVoltage * 13 + (Math.random() - 0.5) * 5,
          current: state.outputCurrent * 0.83 + (Math.random() - 0.5) * 0.5,
        })
      }
      
      // Shutdown transition
      for (let i = shutdownPoint; i < shutdownPoint + 20; i++) {
        const progress = (i - shutdownPoint) / 20
        newData.push({
          time: i,
          voltage: state.outputVoltage * 13 * (1 - progress) + 45 * progress,
          current: state.outputCurrent * 0.83 * (1 - progress) + 12 * progress,
        })
      }
      
      // After shutdown
      for (let i = shutdownPoint + 20; i < totalPoints; i++) {
        newData.push({
          time: i,
          voltage: 45 + (Math.random() - 0.5) * 2,
          current: 12 + (Math.random() - 0.5) * 0.2,
        })
      }
    }
    
    setData(newData)
  }, [state])

  return (
    <div className="glass rounded-xl p-6 h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">电压电流波形</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-400">电压 (V)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
            <span className="text-gray-400">电流 (A)</span>
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400">等待仿真开始...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: '时间 (ms)', position: 'insideBottom', offset: -5, fill: '#64748b' }}
            />
            <YAxis 
              yAxisId="voltage"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: '电压 (V)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            />
            <YAxis 
              yAxisId="current"
              orientation="right"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: '电流 (A)', angle: 90, position: 'insideRight', fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: any, name: string) => {
                if (name === 'voltage') return [`${value.toFixed(1)}V`, '电压']
                return [`${value.toFixed(1)}A`, '电流']
              }}
            />
            {state.isShutdown && (
              <>
                <ReferenceLine 
                  x={30} 
                  stroke="#f59e0b" 
                  strokeDasharray="5 5" 
                  label={{ value: "关断开始", fill: '#f59e0b', fontSize: 12 }}
                />
                <ReferenceLine 
                  yAxisId="voltage"
                  y={45} 
                  stroke="#f59e0b" 
                  strokeDasharray="5 5" 
                  label={{ value: "45V", fill: '#f59e0b', fontSize: 12 }}
                />
                <ReferenceLine 
                  yAxisId="current"
                  y={12} 
                  stroke="#f59e0b" 
                  strokeDasharray="5 5" 
                  label={{ value: "12A", fill: '#f59e0b', fontSize: 12 }}
                />
              </>
            )}
            <Line 
              yAxisId="voltage"
              type="monotone" 
              dataKey="voltage" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              yAxisId="current"
              type="monotone" 
              dataKey="current" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}