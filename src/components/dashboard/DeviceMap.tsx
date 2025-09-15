'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Zap, AlertTriangle } from 'lucide-react'

interface DeviceLocation {
  id: string
  name: string
  lat: number
  lng: number
  status: 'online' | 'offline' | 'fault'
  power: number
}

export default function DeviceMap() {
  const [devices, setDevices] = useState<DeviceLocation[]>([])

  useEffect(() => {
    // Mock device locations
    const mockDevices: DeviceLocation[] = [
      { id: '1', name: '站点A-01', lat: 31.2304, lng: 121.4737, status: 'online', power: 245.5 },
      { id: '2', name: '站点A-02', lat: 31.2404, lng: 121.4837, status: 'online', power: 198.3 },
      { id: '3', name: '站点B-01', lat: 31.2204, lng: 121.4637, status: 'offline', power: 0 },
      { id: '4', name: '站点B-02', lat: 31.2504, lng: 121.4937, status: 'fault', power: 45.2 },
      { id: '5', name: '站点C-01', lat: 31.2104, lng: 121.4537, status: 'online', power: 312.8 },
    ]
    setDevices(mockDevices)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'from-green-500 to-emerald-500'
      case 'offline': return 'from-gray-500 to-gray-600'
      case 'fault': return 'from-red-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return Zap
      case 'offline': return MapPin
      case 'fault': return AlertTriangle
      default: return MapPin
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">设备分布地图</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-400">在线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span className="text-gray-400">离线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-400">故障</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Device Markers */}
        {devices.map((device, index) => {
          const Icon = getStatusIcon(device.status)
          return (
            <motion.div
              key={device.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(device.lng - 121.4537) * 1000 + 50}%`,
                top: `${(31.2504 - device.lat) * 1000 + 50}%`,
              }}
            >
              <div className="relative group cursor-pointer">
                {/* Pulse Animation */}
                {device.status === 'online' && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor(device.status)} rounded-full animate-ping`} />
                )}
                
                {/* Marker */}
                <div className={`relative w-12 h-12 bg-gradient-to-r ${getStatusColor(device.status)} rounded-full flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
                    <p className="font-semibold">{device.name}</p>
                    <p className="text-gray-300">
                      {device.status === 'online' ? `${device.power}W` : device.status}
                    </p>
                  </div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 absolute left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 glass rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">设备统计</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span className="text-gray-400">在线设备:</span>
              <span className="font-semibold">{devices.filter(d => d.status === 'online').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400">离线设备:</span>
              <span className="font-semibold">{devices.filter(d => d.status === 'offline').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-gray-400">故障设备:</span>
              <span className="font-semibold">{devices.filter(d => d.status === 'fault').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}