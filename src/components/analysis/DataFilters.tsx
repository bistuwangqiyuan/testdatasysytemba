'use client'

import { AnalysisFilter } from '@/app/analysis/page'
import { Calendar, Filter, Zap } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Props {
  filters: AnalysisFilter
  setFilters: (filters: AnalysisFilter) => void
}

export default function DataFilters({ filters, setFilters }: Props) {
  const deviceOptions = [
    { id: '1', name: '设备 #1' },
    { id: '2', name: '设备 #2' },
    { id: '3', name: '设备 #3' },
    { id: '4', name: '设备 #4' },
    { id: '5', name: '设备 #5' },
  ]

  const dataTypeOptions = [
    { id: 'voltage', name: '电压', color: 'text-blue-400' },
    { id: 'current', name: '电流', color: 'text-cyan-400' },
    { id: 'power', name: '功率', color: 'text-yellow-400' },
    { id: 'temperature', name: '温度', color: 'text-orange-400' },
  ]

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: new Date(value),
      },
    })
  }

  const handleDeviceToggle = (deviceId: string) => {
    const newDeviceIds = filters.deviceIds.includes(deviceId)
      ? filters.deviceIds.filter(id => id !== deviceId)
      : [...filters.deviceIds, deviceId]
    
    setFilters({
      ...filters,
      deviceIds: newDeviceIds,
    })
  }

  const handleDataTypeToggle = (dataType: string) => {
    const newDataTypes = filters.dataTypes.includes(dataType)
      ? filters.dataTypes.filter(type => type !== dataType)
      : [...filters.dataTypes, dataType]
    
    setFilters({
      ...filters,
      dataTypes: newDataTypes,
    })
  }

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold">数据筛选</h3>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>时间范围</span>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">开始日期</label>
            <input
              type="date"
              value={format(filters.dateRange.start, 'yyyy-MM-dd')}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">结束日期</label>
            <input
              type="date"
              value={format(filters.dateRange.end, 'yyyy-MM-dd')}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Device Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Zap className="w-4 h-4" />
          <span>设备选择</span>
        </div>
        <div className="space-y-2">
          {deviceOptions.map((device) => (
            <label
              key={device.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.deviceIds.includes(device.id)}
                onChange={() => handleDeviceToggle(device.id)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm">{device.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Data Type Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Filter className="w-4 h-4" />
          <span>数据类型</span>
        </div>
        <div className="space-y-2">
          {dataTypeOptions.map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.dataTypes.includes(type.id)}
                onChange={() => handleDataTypeToggle(type.id)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <span className={`text-sm ${type.color}`}>{type.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 mb-2">快速选择</p>
        <div className="space-y-2">
          <button
            onClick={() => setFilters({
              ...filters,
              dateRange: {
                start: new Date(Date.now() - 24 * 60 * 60 * 1000),
                end: new Date(),
              },
            })}
            className="w-full text-left px-3 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            最近24小时
          </button>
          <button
            onClick={() => setFilters({
              ...filters,
              dateRange: {
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                end: new Date(),
              },
            })}
            className="w-full text-left px-3 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            最近7天
          </button>
          <button
            onClick={() => setFilters({
              ...filters,
              dateRange: {
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                end: new Date(),
              },
            })}
            className="w-full text-left px-3 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            最近30天
          </button>
        </div>
      </div>
    </div>
  )
}