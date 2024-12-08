# 洒洒水啦团队官网

这是洒洒水啦团队的官方网站源代码。网站采用静态设计，支持多主题切换和响应式布局。

## 在线预览

访问 [https://salaa-hulaa.github.io/](https://salaa-hulaa.github.io/)

## 功能特性

- 响应式设计，适配各种设备
- 暗色/亮色模式切换
- 多主题支持（默认、暗色、像素、科技、简约、中国风）
- 动态马赛克背景
- 卡片式布局
- 毛玻璃特效
- 平滑动画过渡

## 目录结构

```
.
├── index.html              # 主页面
├── css/                    # 样式文件
│   └── style.css          # 主样式文件
├── js/                    # JavaScript 文件
│   └── updateData.js      # 数据更新脚本
├── data/                  # 数据文件
│   ├── manual-config.json # 手动配置文件
│   ├── members.json       # 成员信息
│   └── projects.json      # 项目信息
└── .github/workflows/     # GitHub Actions
    └── deploy.yml         # 自动部署配置
```

## 配置说明

### 成员信息配置

在 `data/manual-config.json` 中配置成员信息：

```json
{
  "members_override": {
    "用户名": {
      "role": "角色名称",
      "introduction": "个人介绍",
      "skills": ["技能1", "技能2"],
      "interests": ["兴趣1", "兴趣2"],
      "social": {
        "github": "GitHub用户名",
        "custom": {
          "icon": "图标",
          "url": "链接",
          "name": "显示名称"
        }
      }
    }
  }
}
```

### 项目展示配置

```json
{
  "projects_override": {
    "项目名": {
      "description_zh": "项目描述",
      "custom_image": "预览图URL",
      "demo_url": "演示地址",
      "documentation": "文档地址",
      "highlights": ["特点1", "特点2"],
      "team_members": ["成员1", "成员2"],
      "status": "状态",
      "priority": 优先级数字,
      "category": "分类"
    }
  }
}
```

## 自动更新规则

网站支持通过 GitHub Actions 自动更新内容：

- 项目信息：每6小时更新一次
- 成员信息：每12小时更新一次
- 支持排除特定模式的项目和成员
- 自动分类和优先级规则配置

## 开发指南

1. 克隆仓库：
```bash
git clone https://github.com/Salaa-Hulaa/Salaa-Hulaa.github.io.git
cd Salaa-Hulaa.github.io
```

2. 修改配置：
   - 编辑 `data/manual-config.json` 更新成员和项目信息
   - 修改 `css/style.css` 自定义样式
   - 在 `index.html` 中调整页面结构

3. 本地预览：
   - 使用任意 HTTP 服务器启动
   - 例如：`python -m http.server` 或 `live-server`

4. 部署更新：
   - 推送到 main 分支自动触发部署
   - 或手动运行 GitHub Actions 工作流

## 主题定制

支持以下主题模式：

- 默认主题：现代简约风格
- 暗色主题：护眼深色模式
- 像素主题：复古像素风格
- 科技主题：未来科技风格
- 中国风主题：传统东方风格
- 简约主题：极简设计风格

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -am '添加新特性'`
4. 推送分支：`git push origin feature/xxx`
5. 提交 Pull Request

## 技术栈

- HTML5 + CSS3
- 原生 JavaScript
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## 许可证

MIT License