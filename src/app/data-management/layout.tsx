import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据文件管理 - Excel文件批量导入与数据清洗',
  description: '支持Excel文件批量上传、数据预览与分页、智能数据清洗、文件状态跟踪。支持.xlsx、.xls、.csv格式，提供完整的数据文件管理解决方案。',
  keywords: '数据文件管理,Excel导入,数据清洗,文件上传,数据预览,批量处理,CSV处理',
  openGraph: {
    title: '数据文件管理 - Excel文件批量导入与数据清洗',
    description: '支持Excel文件批量上传、数据预览与分页、智能数据清洗、文件状态跟踪。',
    type: 'website',
    url: 'https://testdatasysytemba.netlify.app/data-management',
  },
}

export default function DataManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
