'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileSpreadsheet } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  onUpload: (files: File[]) => void
  uploading?: boolean
}

export default function FileUploader({ onUpload, uploading }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    multiple: true,
    disabled: uploading,
  })

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">文件上传</h3>
      
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{
            scale: isDragActive ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        </motion.div>
        
        {isDragActive ? (
          <p className="text-blue-400 font-medium">释放文件以上传...</p>
        ) : (
          <>
            <p className="text-gray-300 font-medium mb-2">
              拖拽文件到此处，或点击选择文件
            </p>
            <p className="text-sm text-gray-500">
              支持 .xlsx, .xls, .csv 格式
            </p>
          </>
        )}
        
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-300">上传中...</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <FileSpreadsheet className="w-4 h-4" />
          <span>支持批量上传多个文件</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Upload className="w-4 h-4" />
          <span>单个文件最大 10MB</span>
        </div>
      </div>
    </div>
  )
}