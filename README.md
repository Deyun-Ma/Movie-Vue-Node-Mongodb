# 电影推荐系统

这是一个基于 Vue 3 + Node.js + MongoDB 构建的现代化电影推荐系统。

## 技术栈

### 前端
- Vue 3 (使用 Composition API)
- TypeScript
- Vite
- Vue Router
- Pinia (状态管理)
- TailwindCSS
- Axios

### 后端
- Node.js
- Express
- MongoDB
- Mongoose
- JWT 认证
- Bcrypt 密码加密

## 功能特性

- 用户认证（注册/登录）
- 电影列表展示
- 电影详情查看
- 个性化电影推荐
- 用户收藏功能
- 响应式设计

## 项目设置

### 环境要求
- Node.js >= 16.0.0
- MongoDB >= 4.0.0
- pnpm (推荐) 或 npm

### 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd movie-recommendation-app
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
在项目根目录创建 `.env` 文件，添加以下配置：
```
MONGODB_URI=你的MongoDB连接地址
JWT_SECRET=你的JWT密钥
PORT=3000
```

4. 启动开发服务器
```bash
# 启动前端开发服务器
pnpm dev

# 启动后端服务器
pnpm dev:server
```

### 构建生产版本
```bash
pnpm build
```

## 项目结构
```
├── src/                # 前端源代码
├── server/            # 后端源代码
│   ├── models/       # 数据模型
│   ├── routes/       # 路由处理
│   ├── middleware/   # 中间件
│   └── index.js      # 服务器入口
├── public/           # 静态资源
└── package.json      # 项目配置
```

## API 文档

### 认证相关
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录

### 电影相关
- GET /api/movies - 获取电影列表
- GET /api/movies/:id - 获取电影详情
- POST /api/movies/favorite - 收藏电影
- GET /api/movies/recommendations - 获取推荐电影

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT License](LICENSE)
