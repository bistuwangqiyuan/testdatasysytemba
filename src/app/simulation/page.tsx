'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Power, 
  PowerOff, 
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Activity,
  Gauge
} from 'lucide-react'
import SimulationControls from '@/components/simulation/SimulationControls'
import WaveformDisplay from '@/components/simulation/WaveformDisplay'
import SimulationResults from '@/components/simulation/SimulationResults'
import SimulationLog from '@/components/simulation/SimulationLog'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

export interface SimulationParams {
  inputVoltage: number
  inputCurrent: number
  temperature: number
  lightIntensity: number
}

export interface SimulationState {
  isRunning: boolean
  isShutdown: boolean
  outputVoltage: number
  outputCurrent: number
  shutdownTime: number
  powerLoss: number
}

export default function SimulationPage() {
  const { toast } = useToast()
  const [params, setParams] = useState<SimulationParams>({
    inputVoltage: 600,
    inputCurrent: 10,
    temperature: 25,
    lightIntensity: 800,
  })

  const [state, setState] = useState<SimulationState>({
    isRunning: false,
    isShutdown: false,
    outputVoltage: 0,
    outputCurrent: 0,
    shutdownTime: 0,
    powerLoss: 0,
  })

  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('zh-CN')
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 50))
  }

  const handleStart = () => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      isShutdown: false,
      outputVoltage: params.inputVoltage,
      outputCurrent: params.inputCurrent,
    }))
    addLog('仿真开始 - 系统正常运行')
    addLog(`输入参数: 电压=${params.inputVoltage}V, 电流=${params.inputCurrent}A`)
    
    toast({
      title: '仿真已启动',
      description: '光伏关断器正在正常运行',
    })
  }

  const handleShutdown = async () => {
    if (!state.isRunning) {
      toast({
        title: '请先启动仿真',
        description: '需要先启动系统才能执行关断操作',
        variant: 'destructive',
      })
      return
    }

    addLog('执行关断命令...')
    
    // Simulate shutdown process
    setState(prev => ({ ...prev, isShutdown: true }))
    
    // Simulate shutdown delay
    setTimeout(async () => {
      const shutdownTime = 45 + Math.random() * 10 // 45-55ms
      const powerLoss = Math.random() * 5 + 2 // 2-7W
      
      setState(prev => ({
        ...prev,
        outputVoltage: 45,
        outputCurrent: 12,
        shutdownTime,
        powerLoss,
      }))
      
      addLog(`关断完成 - 响应时间: ${shutdownTime.toFixed(1)}ms`)
      addLog(`输出参数: 电压=45V, 电流=12A`)
      
      // Save to database
      try {
        await supabase.from('simulation_records').insert({
          input_voltage: params.inputVoltage,
          input_current: params.inputCurrent,
          output_voltage: 45,
          output_current: 12,
          shutdown_time: shutdownTime,
          simulation_data: {
            temperature: params.temperature,
            lightIntensity: params.lightIntensity,
            powerLoss,
          },
        })
        addLog('仿真结果已保存到数据库')
      } catch (error) {
        console.error('Error saving simulation:', error)
        addLog('保存仿真结果时出错')
      }
      
      toast({
        title: '关断成功',
        description: `响应时间: ${shutdownTime.toFixed(1)}ms`,
      })
    }, 1000)
  }

  const handleEmergencyStop = () => {
    setState({
      isRunning: false,
      isShutdown: false,
      outputVoltage: 0,
      outputCurrent: 0,
      shutdownTime: 0,
      powerLoss: 0,
    })
    setLogs([])
    addLog('紧急停止 - 所有系统已停止')
    
    toast({
      title: '紧急停止',
      description: '仿真已终止',
      variant: 'destructive',
    })
  }

  const handleReset = () => {
    setState({
      isRunning: false,
      isShutdown: false,
      outputVoltage: 0,
      outputCurrent: 0,
      shutdownTime: 0,
      powerLoss: 0,
    })
    setParams({
      inputVoltage: 600,
      inputCurrent: 10,
      temperature: 25,
      lightIntensity: 800,
    })
    setLogs([])
    addLog('系统已重置')
    
    toast({
      title: '系统重置',
      description: '所有参数已恢复默认值',
    })
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">实验仿真</h1>
          <p className="text-gray-400 mt-1">模拟光伏关断器在不同条件下的工作状态</p>
        </div>
        <div className="flex items-center gap-2">
          {state.isRunning && (
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full animate-pulse ${state.isShutdown ? 'bg-orange-500' : 'bg-green-500'}`} />
              <span className="text-gray-400">
                {state.isShutdown ? '关断中' : '运行中'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <SimulationControls 
            params={params} 
            setParams={setParams}
            disabled={state.isRunning}
          />
          
          {/* Control Buttons */}
          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">控制面板</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleStart}
                disabled={state.isRunning}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5" />
                <span>启动</span>
              </button>
              
              <button
                onClick={handleShutdown}
                disabled={!state.isRunning || state.isShutdown}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PowerOff className="w-5 h-5" />
                <span>关断</span>
              </button>
              
              <button
                onClick={handleEmergencyStop}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>紧急停止</span>
              </button>
              
              <button
                onClick={handleReset}
                disabled={state.isRunning}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-5 h-5" />
                <span>重置</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Middle: Waveform Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <WaveformDisplay state={state} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimulationResults state={state} />
            <SimulationLog logs={logs} />
          </div>
        </motion.div>
      </div>

      {/* Status Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="glass rounded-lg p-4 text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm text-gray-400">输入功率</p>
          <p className="text-xl font-bold">
            {(params.inputVoltage * params.inputCurrent).toFixed(0)}W
          </p>
        </div>
        
        <div className="glass rounded-lg p-4 text-center">
          <Activity className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-400">输出功率</p>
          <p className="text-xl font-bold">
            {(state.outputVoltage * state.outputCurrent).toFixed(0)}W
          </p>
        </div>
        
        <div className="glass rounded-lg p-4 text-center">
          <Gauge className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-sm text-gray-400">效率</p>
          <p className="text-xl font-bold">
            {state.isRunning && params.inputVoltage > 0
              ? ((state.outputVoltage * state.outputCurrent) / (params.inputVoltage * params.inputCurrent) * 100).toFixed(1)
              : '0.0'}%
          </p>
        </div>
        
        <div className="glass rounded-lg p-4 text-center">
          <Power className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <p className="text-sm text-gray-400">状态</p>
          <p className="text-xl font-bold">
            {state.isShutdown ? '已关断' : state.isRunning ? '运行中' : '待机'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}