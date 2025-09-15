'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  AlertTriangle, 
  FileBarChart,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import TrendAnalysis from '@/components/analysis/TrendAnalysis'
import AnomalyDetection from '@/components/analysis/AnomalyDetection'
import ReportGeneration from '@/components/analysis/ReportGeneration'
import DataFilters from '@/components/analysis/DataFilters'
import AnalysisSummary from '@/components/analysis/AnalysisSummary'

export interface AnalysisFilter {
  dateRange: {
    start: Date
    end: Date
  }
  deviceIds: string[]
  dataTypes: string[]
}

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<'trend' | 'anomaly' | 'report'>('trend')
  const [filters, setFilters] = useState<AnalysisFilter>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
    deviceIds: [],
    dataTypes: ['voltage', 'current', 'power'],
  })
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const tabs = [
    { id: 'trend', label: '趋势分析', icon: TrendingUp },
    { id: 'anomaly', label: '异常检测', icon: AlertTriangle },
    { id: 'report', label: '报表生成', icon: FileBarChart },
  ]

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">数据分析</h1>
          <p className="text-gray-400 mt-1">深度分析实验数据，生成专业报表</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          刷新数据
        </button>
      </div>

      {/* Summary Cards */}
      <AnalysisSummary filters={filters} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <DataFilters filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Right: Analysis Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-1"
          >
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                    transition-all duration-300
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {activeTab === 'trend' && <TrendAnalysis filters={filters} />}
            {activeTab === 'anomaly' && <AnomalyDetection filters={filters} />}
            {activeTab === 'report' && <ReportGeneration filters={filters} />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}