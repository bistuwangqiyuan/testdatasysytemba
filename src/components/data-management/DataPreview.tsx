'use client'

import { useState, useEffect } from 'react'
import { FileRecord } from '@/app/data-management/page'
import { Table, Eye, Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Props {
  file: FileRecord
}

interface DataRow {
  [key: string]: any
}

export default function DataPreview({ file }: Props) {
  const [data, setData] = useState<DataRow[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    if (file.status === 'completed') {
      loadFileData()
    }
  }, [file])

  const loadFileData = async () => {
    setLoading(true)
    try {
      // In real app, fetch from file_url
      // For demo, generate mock data
      const mockData = generateMockData()
      setData(mockData)
      setColumns(Object.keys(mockData[0] || {}))
    } catch (error) {
      console.error('Error loading file data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockData = (): DataRow[] => {
    const data: DataRow[] = []
    for (let i = 1; i <= 100; i++) {
      data.push({
        序号: i,
        电流: (Math.random() * 20).toFixed(2),
        电压: (Math.random() * 50 + 200).toFixed(2),
        功率: (Math.random() * 1000).toFixed(2),
        时间戳: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        设备地址: Math.floor(Math.random() * 5) + 1,
        设备类型: ['光伏关断器-A型', '光伏关断器-B型', '光伏关断器-C型'][Math.floor(Math.random() * 3)],
      })
    }
    return data
  }

  const totalPages = Math.ceil(data.length / pageSize)
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">数据预览</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            共 {data.length} 条数据
          </span>
          <button
            onClick={() => window.open(file.file_url, '_blank')}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            下载原文件
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">加载数据中...</p>
          </div>
        </div>
      ) : file.status !== 'completed' ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Table className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p className="text-gray-400">文件处理中，请稍候...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-3 text-left font-medium text-gray-300">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                    {columns.map((col) => (
                      <td key={col} className="px-4 py-3 text-gray-400">
                        {typeof row[col] === 'string' && row[col].includes('T') 
                          ? new Date(row[col]).toLocaleString('zh-CN')
                          : row[col]
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-400">
                第 {currentPage} 页，共 {totalPages} 页
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}