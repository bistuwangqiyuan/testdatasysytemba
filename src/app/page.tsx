'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Activity, 
  Database, 
  FileBarChart, 
  Cpu,
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react'

export default function HomePage() {
  // 结构化数据 - 软件应用
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "光伏关断器实验数据管理系统",
    "alternateName": "光伏数据系统",
    "description": "专业的光伏关断器实验数据管理与分析平台，提供实时监控、实验仿真、数据分析等功能。支持批量数据导入、智能清洗、异常检测，助力光伏设备研发与优化。",
    "url": "https://testdatasysytemba.netlify.app",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Data Management & Analysis",
    "operatingSystem": "Web Browser, Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "光伏关断器实验数据管理系统",
      "url": "https://testdatasysytemba.netlify.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "光伏关断器实验数据管理系统"
    },
    "featureList": [
      "实时数据监控与设备状态展示",
      "光伏关断器实验仿真",
      "多维度数据分析与趋势预测",
      "批量数据文件导入与管理",
      "智能异常检测与告警",
      "专业报表生成与导出"
    ],
    "screenshot": "https://testdatasysytemba.netlify.app/og-image.jpg",
    "softwareVersion": "1.0.0",
    "datePublished": "2025-01-01",
    "dateModified": "2025-10-05",
    "inLanguage": "zh-CN"
  }

  // 组织信息
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "光伏关断器实验数据管理系统",
    "url": "https://testdatasysytemba.netlify.app",
    "logo": "https://testdatasysytemba.netlify.app/og-image.jpg",
    "description": "专业的光伏关断器实验数据管理与分析平台",
    "sameAs": [
      "https://testdatasysytemba.netlify.app"
    ]
  }

  // 面包屑导航
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://testdatasysytemba.netlify.app"
      }
    ]
  }

  // 网站信息
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "光伏关断器实验数据管理系统",
    "alternateName": "光伏数据系统",
    "url": "https://testdatasysytemba.netlify.app",
    "description": "专业的光伏关断器实验数据管理与分析平台",
    "inLanguage": "zh-CN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://testdatasysytemba.netlify.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const features = [
    {
      icon: Activity,
      title: '数据展示大屏',
      description: '实时监控光伏关断器运行状态，展示关键性能指标',
      href: '/dashboard',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: Cpu,
      title: '实验仿真',
      description: '模拟不同条件下的关断器工作状态，预测性能表现',
      href: '/simulation',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2,
    },
    {
      icon: Database,
      title: '数据文件管理',
      description: '批量导入、清洗和管理实验数据文件',
      href: '/data-management',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3,
    },
    {
      icon: FileBarChart,
      title: '数据分析',
      description: '深度分析实验数据，生成专业报表',
      href: '/analysis',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
  ]

  const stats = [
    { label: '在线设备', value: '127', icon: Zap },
    { label: '今日实验', value: '45', icon: Activity },
    { label: '数据记录', value: '1.2M', icon: Database },
    { label: '系统可用性', value: '99.9%', icon: Shield },
  ]

  return (
    <>
      {/* 结构化数据 - 软件应用 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      {/* 结构化数据 - 组织信息 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* 结构化数据 - 面包屑导航 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* 结构化数据 - 网站信息 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">光伏关断器</span>
              <br />
              实验数据管理系统
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              高端工业化的数据管理平台，为光伏关断器研发提供全方位数据支持
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              进入控制台
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            核心功能模块
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <Link
                  href={feature.href}
                  className="block glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:gradient-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center text-sm text-blue-400 group-hover:text-blue-300">
                    <span>查看详情</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </>
  )
}