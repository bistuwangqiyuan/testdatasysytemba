# 光伏关断器实验数据管理系统

一个高端、工业化的光伏关断器实验数据管理平台，提供实时数据监控、实验仿真、数据分析等功能。

![System Overview](https://img.shields.io/badge/Next.js-14.1.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.39.3-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 功能特性

### 📊 数据展示大屏
- 实时功率曲线监控
- 累计发电量统计
- 设备状态分布可视化
- 故障率趋势分析
- 关断时间统计
- 设备地理分布展示

### 🔬 实验仿真
- 模拟不同条件下的关断器工作状态
- 实时电压电流波形显示
- 关断控制模拟（标准输出：45V、12A）
- 仿真参数调节（电压、电流、温度、光照强度）
- 仿真结果记录与分析

### 📁 数据文件管理
- Excel文件批量上传
- 数据预览与分页
- 智能数据清洗
- 文件状态跟踪
- 批量导入导出

### 📈 数据分析
- 多维度趋势分析
- 智能异常检测
- 自定义报表生成
- 定期报告配置
- 数据导出（PDF/Excel）

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI框架**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **数据可视化**: Recharts + D3.js
- **动画效果**: Framer Motion
- **数据库**: Supabase (PostgreSQL)
- **文件存储**: Supabase Storage
- **部署平台**: Netlify

## 📦 安装部署

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd photovoltaic-shutdown-system
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量

创建 `.env.local` 文件：
```env
PUBLIC_SUPABASE_URL=https://zzyueuweeoakopuuwfau.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. 初始化数据库

在 Supabase 控制台执行 `supabase_schema.sql` 文件中的 SQL 语句。

5. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 生产部署

1. 构建项目
```bash
npm run build
```

2. Netlify 部署

- 连接 GitHub 仓库
- 设置构建命令: `npm run build`
- 设置发布目录: `.next`
- 配置环境变量

## 📱 使用指南

### 数据上传格式

支持的文件格式：`.xlsx`, `.xls`, `.csv`

数据格式示例：
```
序号 | 电流(A) | 电压(V) | 功率(W) | 时间戳 | 设备地址 | 设备类型
1    | 0.11    | 20.355  | 2.239   | 2025/5/2 | 1 | 光伏关断器-A型
```

### 仿真参数范围

- **输入电压**: 0-1000V
- **输入电流**: 0-100A
- **环境温度**: -40°C ~ 85°C
- **光照强度**: 0-1000 W/m²

## 🏗️ 项目结构

```
/workspace
├── src/
│   ├── app/                    # Next.js 页面
│   │   ├── dashboard/         # 数据大屏
│   │   ├── simulation/        # 实验仿真
│   │   ├── data-management/   # 数据管理
│   │   └── analysis/          # 数据分析
│   ├── components/            # React 组件
│   │   ├── ui/               # 基础 UI 组件
│   │   ├── dashboard/        # 大屏组件
│   │   ├── simulation/       # 仿真组件
│   │   ├── data-management/  # 数据管理组件
│   │   └── analysis/         # 分析组件
│   ├── lib/                  # 工具函数
│   ├── hooks/                # 自定义 Hooks
│   ├── types/                # TypeScript 类型
│   └── styles/               # 全局样式
├── public/                   # 静态资源
├── supabase_schema.sql      # 数据库架构
└── package.json             # 项目配置
```

## 🔧 API 说明

### Supabase 数据表

- `devices` - 设备信息表
- `experiment_data` - 实验数据表
- `file_records` - 文件记录表
- `anomaly_records` - 异常记录表
- `simulation_records` - 仿真记录表

### 主要功能接口

```typescript
// 上传文件
uploadFile(file: File, path: string): Promise<UploadData>

// 获取设备状态
getDeviceStatus(): Promise<DeviceStatus[]>

// 保存仿真结果
saveSimulation(data: SimulationData): Promise<void>

// 生成报表
generateReport(filters: ReportFilters): Promise<Blob>
```

## 🎨 设计规范

### 色彩系统

- **主色调**: 深蓝色 (#1e3a8a) + 青色 (#06b6d4)
- **背景色**: 深色 (#050505)
- **强调色**: 橙色 (#f59e0b) 用于警示
- **成功色**: 绿色 (#10b981)
- **危险色**: 红色 (#ef4444)

### 组件风格

- **玻璃态效果**: 半透明背景 + 模糊效果
- **渐变边框**: 蓝色到青色渐变
- **悬浮效果**: 阴影 + 发光效果
- **动画过渡**: 平滑的淡入淡出效果

## 📋 待办事项

- [ ] 添加用户认证系统
- [ ] 实现实时数据推送
- [ ] 增加数据导出格式
- [ ] 优化移动端体验
- [ ] 添加多语言支持
- [ ] 集成 AI 分析功能
- [ ] (2025-11-25) 修复数据分析页客户端异常并改用真实数据源

### Discovered During Work
- 暂无

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 联系方式

- 项目负责人：[您的名字]
- Email: [您的邮箱]
- 项目地址：[GitHub URL]

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！