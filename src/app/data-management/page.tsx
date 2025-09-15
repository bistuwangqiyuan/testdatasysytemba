'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import FileUploader from '@/components/data-management/FileUploader'
import FileList from '@/components/data-management/FileList'
import DataPreview from '@/components/data-management/DataPreview'
import DataCleaning from '@/components/data-management/DataCleaning'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

export interface FileRecord {
  id: string
  filename: string
  file_url: string
  upload_time: string
  data_count: number
  status: 'processing' | 'completed' | 'failed'
}

export default function DataManagementPage() {
  const { toast } = useToast()
  const [files, setFiles] = useState<FileRecord[]>([])
  const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null)
  const [uploading, setUploading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    setRefreshing(true)
    try {
      const { data, error } = await supabase
        .from('file_records')
        .select('*')
        .order('upload_time', { ascending: false })

      if (error) throw error
      setFiles(data || [])
    } catch (error) {
      console.error('Error fetching files:', error)
      toast({
        title: '获取文件列表失败',
        description: '请稍后重试',
        variant: 'destructive',
      })
    } finally {
      setRefreshing(false)
    }
  }

  const handleFileUpload = async (acceptedFiles: File[]) => {
    setUploading(true)
    
    for (const file of acceptedFiles) {
      try {
        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('experiment-files')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('experiment-files')
          .getPublicUrl(fileName)

        // Save file record to database
        const { data: fileRecord, error: dbError } = await supabase
          .from('file_records')
          .insert({
            filename: file.name,
            file_url: publicUrl,
            data_count: 0, // Will be updated after processing
            status: 'processing',
          } as any)
          .select()
          .single()

        if (dbError) throw dbError

        // Add to local state
        setFiles(prev => [fileRecord, ...prev])

        toast({
          title: '文件上传成功',
          description: `${file.name} 已上传并开始处理`,
        })

        // Simulate processing (in real app, this would be done server-side)
        setTimeout(async () => {
          const updateData: any = { 
            status: 'completed',
            data_count: Math.floor(Math.random() * 1000) + 100 
          }
          const { error: updateError } = await supabase
            .from('file_records')
            .update(updateData)
            .eq('id', fileRecord.id)

          if (!updateError) {
            setFiles(prev => prev.map(f => 
              f.id === fileRecord.id 
                ? { ...f, status: 'completed', data_count: Math.floor(Math.random() * 1000) + 100 }
                : f
            ))
          }
        }, 3000)

      } catch (error) {
        console.error('Error uploading file:', error)
        toast({
          title: '文件上传失败',
          description: file.name,
          variant: 'destructive',
        })
      }
    }
    
    setUploading(false)
  }

  const handleDeleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('file_records')
        .delete()
        .eq('id', fileId)

      if (error) throw error

      setFiles(prev => prev.filter(f => f.id !== fileId))
      if (selectedFile?.id === fileId) {
        setSelectedFile(null)
      }

      toast({
        title: '文件已删除',
        description: '文件记录已从系统中移除',
      })
    } catch (error) {
      console.error('Error deleting file:', error)
      toast({
        title: '删除失败',
        description: '请稍后重试',
        variant: 'destructive',
      })
    }
  }

  const stats = {
    total: files.length,
    completed: files.filter(f => f.status === 'completed').length,
    processing: files.filter(f => f.status === 'processing').length,
    failed: files.filter(f => f.status === 'failed').length,
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">数据文件管理</h1>
          <p className="text-gray-400 mt-1">上传、预览和管理实验数据文件</p>
        </div>
        <button
          onClick={fetchFiles}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          刷新
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">总文件数</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <FileSpreadsheet className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">已完成</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">处理中</p>
              <p className="text-2xl font-bold">{stats.processing}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">失败</p>
              <p className="text-2xl font-bold">{stats.failed}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: File Upload and List */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FileUploader 
              onUpload={handleFileUpload}
              uploading={uploading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FileList
              files={files}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onDeleteFile={handleDeleteFile}
            />
          </motion.div>
        </div>

        {/* Right: Data Preview and Cleaning */}
        <div className="lg:col-span-2 space-y-6">
          {selectedFile ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <DataPreview file={selectedFile} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <DataCleaning file={selectedFile} />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl p-12 text-center"
            >
              <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400">选择一个文件以查看详情</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}