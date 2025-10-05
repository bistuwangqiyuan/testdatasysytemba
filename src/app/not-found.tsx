import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '页面未找到 - 404',
  description: '抱歉，您访问的页面不存在。',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">页面未找到</h2>
        <p className="text-gray-400 mb-8">抱歉，您访问的页面不存在。</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
