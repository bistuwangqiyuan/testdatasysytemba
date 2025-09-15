# 部署指南

## Netlify 部署步骤

### 1. 准备工作

确保您的代码已经推送到 GitHub 仓库。

### 2. 在 Netlify 创建新站点

1. 登录 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" > "Import an existing project"
3. 选择 "Deploy with GitHub"
4. 授权并选择您的仓库

### 3. 配置构建设置

在 "Site configuration" 页面设置：

- **Branch to deploy**: `main` 或您的主分支
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### 4. 配置环境变量

在 "Environment variables" 部分添加：

```
PUBLIC_SUPABASE_URL=https://zzyueuweeoakopuuwfau.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eXVldXdlZW9ha29wdXV3ZmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODEzMDEsImV4cCI6MjA1OTk1NzMwMX0.y8V3EXK9QVd3txSWdE3gZrSs96Ao0nvpnd0ntZw_dQ4
```

注意：生产环境中请使用您自己的 Supabase 项目凭据。

### 5. 部署

点击 "Deploy" 按钮开始部署。首次部署可能需要几分钟。

### 6. 自定义域名（可选）

部署成功后，您可以：

1. 进入 "Domain management" 设置
2. 添加自定义域名
3. 按照指示配置 DNS

## Supabase 配置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 创建新项目
3. 记录项目 URL 和 API 密钥

### 2. 初始化数据库

1. 在 Supabase 仪表板中，进入 SQL 编辑器
2. 执行 `supabase_schema.sql` 文件中的所有 SQL 语句
3. 确认所有表和策略创建成功

### 3. 配置存储

1. 进入 Storage 设置
2. 确认 `experiment-files` bucket 已创建
3. 设置适当的文件大小限制和 MIME 类型

### 4. 安全设置

生产环境建议：

1. 启用行级安全性（RLS）
2. 配置适当的 CORS 设置
3. 定期备份数据库

## 性能优化

### 1. 图片优化

- 使用 Next.js Image 组件
- 配置适当的图片格式和大小

### 2. 缓存策略

在 `netlify.toml` 中已配置基础缓存规则，可根据需要调整。

### 3. 监控

- 使用 Netlify Analytics 监控性能
- 配置 Supabase 的监控告警

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本是否为 18+
   - 确认所有环境变量已设置
   - 查看构建日志中的具体错误

2. **数据库连接失败**
   - 验证 Supabase URL 和密钥
   - 检查网络连接
   - 确认数据库表已创建

3. **文件上传失败**
   - 检查 Storage bucket 权限
   - 验证文件大小限制
   - 确认 CORS 设置正确

### 获取帮助

- Netlify 文档：https://docs.netlify.com/
- Supabase 文档：https://supabase.com/docs
- 项目 Issues：[GitHub Issues 链接]