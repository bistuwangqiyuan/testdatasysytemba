'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Zap, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Power,
  PowerOff
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import PowerChart from '@/components/dashboard/PowerChart'
import DeviceStatusChart from '@/components/dashboard/DeviceStatusChart'
import ShutdownTimeChart from '@/components/dashboard/ShutdownTimeChart'
import FaultRateChart from '@/components/dashboard/FaultRateChart'
import RealtimeMetrics from '@/components/dashboard/RealtimeMetrics'
import DeviceMap from '@/components/dashboard/DeviceMap'

interface DashboardStats {
  totalDevices: number
  onlineDevices: number
  offlineDevices: number
  shutdownDevices: number
  totalPower: number
  avgShutdownTime: number
  faultRate: number
  totalEnergy: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    shutdownDevices: 0,
    totalPower: 0,
    avgShutdownTime: 0,
    faultRate: 0,
    totalEnergy: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    
    // Set up real-time subscriptions
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'devices' },
        () => fetchDashboardData()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'experiment_data' },
        () => fetchDashboardData()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch device statistics
      const { data: devices } = await supabase
        .from('devices')
        .select('*')

      if (devices && devices.length > 0) {
        const onlineCount = devices.filter((d: any) => d.status === 'online').length
        const offlineCount = devices.filter((d: any) => d.status === 'offline').length
        const shutdownCount = devices.filter((d: any) => d.status === 'shutdown').length

        // Fetch latest power data
        const { data: powerData } = await supabase
          .from('experiment_data')
          .select('power')
          .order('timestamp', { ascending: false })
          .limit(100)

        const totalPower = powerData?.reduce((sum: number, d: any) => sum + Number(d.power), 0) || 0
        const avgPower = powerData?.length ? totalPower / powerData.length : 0

        setStats({
          totalDevices: devices.length,
          onlineDevices: onlineCount,
          offlineDevices: offlineCount,
          shutdownDevices: shutdownCount,
          totalPower: avgPower,
          avgShutdownTime: 45.2, // Mock data
          faultRate: 2.3, // Mock data
          totalEnergy: 1234.5, // Mock data
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: '在线设备',
      value: stats.onlineDevices,
      total: stats.totalDevices,
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: '离线设备',
      value: stats.offlineDevices,
      total: stats.totalDevices,
      icon: PowerOff,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/20',
      trend: '-2%',
      trendUp: false,
    },
    {
      title: '关断设备',
      value: stats.shutdownDevices,
      total: stats.totalDevices,
      icon: Power,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      trend: '+1%',
      trendUp: true,
    },
    {
      title: '平均关断时间',
      value: `${stats.avgShutdownTime}ms`,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      trend: '-10ms',
      trendUp: false,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">加载数据中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">数据展示大屏</h1>
          <p className="text-gray-400 mt-1">实时监控光伏关断器运行状态</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>实时更新</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {typeof stat.value === 'number' ? stat.value : stat.value}
                  </span>
                  {stat.total && (
                    <span className="text-gray-500">/ {stat.total}</span>
                  )}
                </div>
                {stat.trend && (
                  <div className="mt-2 flex items-center gap-1">
                    {stat.trendUp ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} text-white`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PowerChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <DeviceStatusChart />
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ShutdownTimeChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <FaultRateChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RealtimeMetrics />
        </motion.div>
      </div>

      {/* Device Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <DeviceMap />
      </motion.div>
    </div>
  )
}