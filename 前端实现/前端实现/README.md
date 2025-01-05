# 旅游服务前端项目

## 项目简介
这是一个基于Vue 3 + Vite构建的现代化旅游服务前端项目，提供酒店预订、景点浏览、商品购买等功能。

## 技术栈
- **核心框架**: Vue 3
- **构建工具**: Vite
- **UI组件库**: 
  - Element Plus
  - Varlet UI
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP客户端**: Axios
- **地图服务**: 高德地图 JS API
- **CSS预处理器**: Sass

## 主要功能
1. 用户认证与授权
2. 酒店搜索与预订
3. 景点浏览与门票预订
4. 商品展示与购买
5. 智能客服聊天
6. 旅游路线规划
7. 地图服务集成

## 项目结构
```
project-root/
├── src/
│   ├── api/              # API接口
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia状态管理
│   ├── utils/           # 工具函数
│   └── views/           # 页面组件
├── public/              # 公共资源
└── package.json         # 项目配置
```

## 开发环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 主要组件
1. **Banner组件**
   - 首页轮播图展示
   - 支持自定义图片和链接

2. **CategoryCard组件**
   - 商品分类卡片
   - 支持图片、标题、描述等信息展示

3. **Chat组件**
   - 智能客服对话界面
   - 支持实时消息交互
   - 自动滚动到最新消息

## 项目配置
1. **路由配置**
   - 采用Vue Router进行路由管理
   - 支持路由懒加载

2. **API配置**
   - 统一的API请求封装
   - 支持请求拦截和响应拦截

3. **样式配置**
   - 使用Sass进行样式预处理
   - 支持主题定制

## 开发规范
1. **命名规范**
   - 组件名使用PascalCase
   - 文件名使用kebab-case
   - 变量名使用camelCase

2. **代码风格**
   - 使用ESLint进行代码检查
   - 使用Prettier进行代码格式化

## 部署说明
1. 构建生产版本
```bash
npm run build
```

2. 部署dist目录到Web服务器

## 注意事项
1. 确保API接口地址配置正确
2. 注意高德地图API密钥的配置
3. 开发时注意跨域问题的处理

## 贡献指南
1. Fork本仓库
2. 创建特性分支
3. 提交代码
4. 创建Pull Request

## 许可证
[MIT License](LICENSE)
