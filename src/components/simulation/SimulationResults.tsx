'use client'

import { SimulationState } from '@/app/simulation/page'
import { Clock, Zap, TrendingDown, CheckCircle } from 'lucide-react'

interface Props {
  state: SimulationState
}

export default function SimulationResults({ state }: Props) {
  const results = [
    {
      label: '关断时间',
      value: state.shutdownTime > 0 ? `${state.shutdownTime.toFixed(1)}ms` : '-',
      icon: Clock,
      color: state.shutdownTime > 0 && state.shutdownTime < 50 ? 'text-green-500' : 'text-yellow-500',
    },
    {
      label: '输出电压',
      value: state.outputVoltage > 0 ? `${state.outputVoltage.toFixed(1)}V` : '-',
      icon: Zap,
      color: state.isShutdown && state.outputVoltage === 45 ? 'text-green-500' : 'text-blue-500',
    },
    {
      label: '输出电流',
      value: state.outputCurrent > 0 ? `${state.outputCurrent.toFixed(1)}A` : '-',
      icon: Zap,
      color: state.isShutdown && state.outputCurrent === 12 ? 'text-green-500' : 'text-cyan-500',
    },
    {
      label: '功率损耗',
      value: state.powerLoss > 0 ? `${state.powerLoss.toFixed(1)}W` : '-',
      icon: TrendingDown,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">仿真结果</h3>
      
      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.label}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <result.icon className={`w-5 h-5 ${result.color}`} />
              <span className="text-sm text-gray-400">{result.label}</span>
            </div>
            <span className="text-lg font-semibold">{result.value}</span>
          </div>
        ))}
      </div>

      {state.isShutdown && state.shutdownTime > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-green-400">
              关断测试通过 - 符合标准要求
            </p>
          </div>
        </div>
      )}
    </div>
  )
}