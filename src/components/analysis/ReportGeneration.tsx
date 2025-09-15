'use client'

import { useState } from 'react'
import { AnalysisFilter } from '@/app/analysis/page'
import { FileText, Download, Calendar, Settings, Send } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useToast } from '@/hooks/use-toast'

interface Props {
  filters: AnalysisFilter
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  sections: string[]
}

export default function ReportGeneration({ filters }: Props) {
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState<string>('comprehensive')
  const [reportFormat, setReportFormat] = useState<'pdf' | 'excel'>('pdf')
  const [generating, setGenerating] = useState(false)
  const [scheduledReports, setScheduledReports] = useState([
    { id: '1', name: '每日运行报告', frequency: '每天 08:00', status: 'active' },
    { id: '2', name: '周度分析报告', frequency: '每周一 09:00', status: 'active' },
    { id: '3', name: '月度总结报告', frequency: '每月1日 10:00', status: 'paused' },
  ])

  const templates: ReportTemplate[] = [
    {
      id: 'comprehensive',
      name: '综合分析报告',
      description: '包含所有数据分析的完整报告',
      sections: ['概览', '趋势分析', '异常检测', '性能指标', '建议'],
    },
    {
      id: 'performance',
      name: '性能分析报告',
      description: '专注于设备性能和效率分析',
      sections: ['性能概览', '效率趋势', '功率分析', '优化建议'],
    },
    {
      id: 'anomaly',
      name: '异常检测报告',
      description: '详细的异常事件分析报告',
      sections: ['异常概览', '异常分布', '原因分析', '处理建议'],
    },
    {
      id: 'custom',
      name: '自定义报告',
      description: '根据需求自定义报告内容',
      sections: ['自定义内容'],
    },
  ]

  const handleGenerateReport = async () => {
    setGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false)
      toast({
        title: '报告生成成功',
        description: `${templates.find(t => t.id === selectedTemplate)?.name} 已生成`,
      })
      
      // In real app, trigger download
      const link = document.createElement('a')
      link.href = '#'
      link.download = `report_${format(new Date(), 'yyyyMMdd_HHmmss')}.${reportFormat}`
      link.click()
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">选择报告模板</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`
                p-4 rounded-lg cursor-pointer transition-all
                ${selectedTemplate === template.id
                  ? 'bg-blue-500/20 border border-blue-500/50'
                  : 'bg-white/5 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{template.name}</h4>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400 mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-1">
                {template.sections.map((section) => (
                  <span
                    key={section}
                    className="text-xs px-2 py-1 bg-gray-700 rounded"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Settings */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">报告设置</h3>
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">数据范围</label>
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                {format(filters.dateRange.start, 'yyyy/MM/dd', { locale: zhCN })} - 
                {format(filters.dateRange.end, 'yyyy/MM/dd', { locale: zhCN })}
              </span>
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">输出格式</label>
            <div className="flex gap-2">
              <button
                onClick={() => setReportFormat('pdf')}
                className={`
                  flex-1 py-2 rounded-lg transition-all
                  ${reportFormat === 'pdf'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                `}
              >
                PDF
              </button>
              <button
                onClick={() => setReportFormat('excel')}
                className={`
                  flex-1 py-2 rounded-lg transition-all
                  ${reportFormat === 'excel'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                `}
              >
                Excel
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                生成报告
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">定期报告</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4" />
            设置
          </button>
        </div>
        <div className="space-y-2">
          {scheduledReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
            >
              <div>
                <p className="font-medium text-sm">{report.name}</p>
                <p className="text-xs text-gray-400">{report.frequency}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  text-xs px-2 py-1 rounded
                  ${report.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                  }
                `}>
                  {report.status === 'active' ? '启用' : '暂停'}
                </span>
                <button className="p-1 rounded hover:bg-white/10 transition-colors">
                  <Send className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}