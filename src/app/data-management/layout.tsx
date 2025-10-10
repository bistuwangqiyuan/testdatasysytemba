import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '数据文件管理 - Excel文件批量导入与智能数据清洗',
  description: '批量导入、清洗和管理光伏关断器实验数据文件。支持Excel文件批量上传、数据预览与分页、智能数据清洗、文件状态跟踪。支持CSV、Excel（.xlsx、.xls）等多种格式，提供数据预览、智能清洗、格式转换等功能，确保数据质量与完整性，提供完整的数据文件管理解决方案。',
  keywords: ['数据文件管理', 'Excel导入', '数据清洗', '文件上传', '数据预览', '批量处理', 'CSV处理', '批量导入', '格式转换', '数据质量', '文件管理'],
  openGraph: {
    title: '数据文件管理 - Excel文件批量导入与智能数据清洗',
    description: '批量导入、清洗和管理光伏关断器实验数据文件。支持Excel文件批量上传、数据预览与分页、智能数据清洗',
    url: 'https://testdatasysytemba.netlify.app/data-management',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '数据文件管理界面',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '数据文件管理 - Excel文件批量导入与智能数据清洗',
    description: '批量导入、清洗和管理光伏关断器实验数据文件',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://testdatasysytemba.netlify.app/data-management',
  },
}

export default function DataManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

