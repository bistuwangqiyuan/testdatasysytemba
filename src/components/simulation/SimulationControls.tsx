'use client'

import { SimulationParams } from '@/app/simulation/page'
import { Zap, Thermometer, Sun } from 'lucide-react'

interface Props {
  params: SimulationParams
  setParams: (params: SimulationParams) => void
  disabled?: boolean
}

export default function SimulationControls({ params, setParams, disabled }: Props) {
  const handleChange = (key: keyof SimulationParams, value: number) => {
    setParams({ ...params, [key]: value })
  }

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-semibold">输入参数设置</h3>
      
      {/* Input Voltage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4" />
            输入电压
          </label>
          <span className="text-sm font-mono">{params.inputVoltage}V</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={params.inputVoltage}
          onChange={(e) => handleChange('inputVoltage', Number(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${params.inputVoltage / 10}%, #374151 ${params.inputVoltage / 10}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0V</span>
          <span>1000V</span>
        </div>
      </div>

      {/* Input Current */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4" />
            输入电流
          </label>
          <span className="text-sm font-mono">{params.inputCurrent}A</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={params.inputCurrent}
          onChange={(e) => handleChange('inputCurrent', Number(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${params.inputCurrent}%, #374151 ${params.inputCurrent}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0A</span>
          <span>100A</span>
        </div>
      </div>

      {/* Temperature */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Thermometer className="w-4 h-4" />
            环境温度
          </label>
          <span className="text-sm font-mono">{params.temperature}°C</span>
        </div>
        <input
          type="range"
          min="-40"
          max="85"
          step="1"
          value={params.temperature}
          onChange={(e) => handleChange('temperature', Number(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(params.temperature + 40) / 1.25}%, #374151 ${(params.temperature + 40) / 1.25}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>-40°C</span>
          <span>85°C</span>
        </div>
      </div>

      {/* Light Intensity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Sun className="w-4 h-4" />
            光照强度
          </label>
          <span className="text-sm font-mono">{params.lightIntensity} W/m²</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={params.lightIntensity}
          onChange={(e) => handleChange('lightIntensity', Number(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #eab308 0%, #eab308 ${params.lightIntensity / 10}%, #374151 ${params.lightIntensity / 10}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0 W/m²</span>
          <span>1000 W/m²</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <p className="text-sm text-gray-400 mb-2">输入功率</p>
        <p className="text-2xl font-bold gradient-text">
          {(params.inputVoltage * params.inputCurrent).toFixed(1)} W
        </p>
      </div>
    </div>
  )
}