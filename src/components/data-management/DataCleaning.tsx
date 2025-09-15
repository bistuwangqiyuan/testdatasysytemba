'use client'

import { useState } from 'react'
import { FileRecord } from '@/app/data-management/page'
import { Sparkles, AlertTriangle, CheckCircle, Settings } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Props {
  file: FileRecord
}

interface CleaningOption {
  id: string
  label: string
  description: string
  enabled: boolean
  severity: 'low' | 'medium' | 'high'
}

export default function DataCleaning({ file }: Props) {
  const { toast } = useToast()
  const [cleaning, setCleaning] = useState(false)
  const [options, setOptions] = useState<CleaningOption[]>([
    {
      id: 'missing',
      label: '缺失值处理',
      description: '使用均值或前值填充缺失数据',
      enabled: true,
      severity: 'high',
    },
    {
      id: 'outliers',
      label: '异常值检测',
      description: '识别并处理超出正常范围的数据点',
      enabled: true,
      severity: 'medium',
    },
    {
      id: 'duplicates',
      label: '重复数据清理',
      description: '删除完全相同的数据记录',
      enabled: false,
      severity: 'low',
    },
    {
      id: 'format',
      label: '格式标准化',
      description: '统一日期时间和数值格式',
      enabled: true,
      severity: 'low',
    },
  ])

  const [results, setResults] = useState({
    missingValues: 12,
    outliers: 5,
    duplicates: 0,
    formatIssues: 8,
  })

  const toggleOption = (id: string) => {
    setOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
    ))
  }

  const handleClean = async () => {
    setCleaning(true)
    
    // Simulate cleaning process
    setTimeout(() => {
      setCleaning(false)
      toast({
        title: '数据清洗完成',
        description: '已处理 25 个数据问题',
      })
      
      // Update results
      setResults({
        missingValues: 0,
        outliers: 2,
        duplicates: 0,
        formatIssues: 0,
      })
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  if (file.status !== 'completed') {
    return null
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">数据清洗</h3>
        </div>
        <button
          onClick={handleClean}
          disabled={cleaning || !options.some(opt => opt.enabled)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cleaning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              清洗中...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              开始清洗
            </>
          )}
        </button>
      </div>

      {/* Cleaning Options */}
      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={option.enabled}
                onChange={() => toggleOption(option.id)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
              />
              <div>
                <p className="font-medium">{option.label}</p>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </div>
            <span className={`text-sm ${getSeverityColor(option.severity)}`}>
              {option.severity === 'high' ? '高优先级' : option.severity === 'medium' ? '中优先级' : '低优先级'}
            </span>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="p-4 rounded-lg bg-white/5">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-gray-400" />
          <p className="text-sm font-medium">数据质量报告</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">缺失值</span>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${results.missingValues > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {results.missingValues}
              </span>
              {results.missingValues === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
              {results.missingValues > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">异常值</span>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${results.outliers > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {results.outliers}
              </span>
              {results.outliers === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
              {results.outliers > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">重复数据</span>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${results.duplicates > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {results.duplicates}
              </span>
              {results.duplicates === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
              {results.duplicates > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">格式问题</span>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${results.formatIssues > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {results.formatIssues}
              </span>
              {results.formatIssues === 0 && <CheckCircle className="w-4 h-4 text-green-500" />}
              {results.formatIssues > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}