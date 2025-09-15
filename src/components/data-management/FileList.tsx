'use client'

import { FileRecord } from '@/app/data-management/page'
import { FileSpreadsheet, Download, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  files: FileRecord[]
  selectedFile: FileRecord | null
  onSelectFile: (file: FileRecord) => void
  onDeleteFile: (fileId: string) => void
}

export default function FileList({ files, selectedFile, onSelectFile, onDeleteFile }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'processing':
        return '处理中'
      case 'failed':
        return '失败'
      default:
        return status
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">文件列表</h3>
        <span className="text-sm text-gray-400">{files.length} 个文件</span>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {files.length === 0 ? (
            <div className="text-center py-8">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-gray-500" />
              <p className="text-gray-400">暂无文件</p>
              <p className="text-sm text-gray-500 mt-1">上传文件开始管理</p>
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                onClick={() => onSelectFile(file)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all
                  ${selectedFile?.id === file.id 
                    ? 'bg-blue-500/20 border border-blue-500/50' 
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1 line-clamp-1">
                        {file.filename}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{format(new Date(file.upload_time), 'MM/dd HH:mm', { locale: zhCN })}</span>
                        <span>{file.data_count} 条数据</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(file.status)}
                      <span className="text-xs text-gray-400">
                        {getStatusText(file.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(file.file_url, '_blank')
                        }}
                        className="p-1.5 rounded hover:bg-white/10 transition-colors"
                        title="下载"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm('确定要删除这个文件吗？')) {
                            onDeleteFile(file.id)
                          }
                        }}
                        className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}