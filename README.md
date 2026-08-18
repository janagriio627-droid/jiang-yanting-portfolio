# 个人作品集网站

这是一个面向国内招聘方的纯静态作品集网站，可直接部署到 GitHub Pages，后续也可以将同一份文件迁移到腾讯云 COS + CDN。

## 当前页面

- `index.html`：首页、个人介绍、能力与精选项目
- `project.html?slug=applyflow`：项目案例详情（同页支持另外两个项目 slug）
- `data.js`：全站文字和项目数据
- `assets/projects/`：三个真实项目的展示图片
- `styles.css`：视觉、响应式与动效

当前已填入江岩庭的个人信息，以及网申助手、Offer 小窝和 Together-Eat 三个真实项目。

## 替换内容

优先编辑 `data.js`：

1. 修改 `site` 中的姓名、职位、所在地、个人介绍与邮箱。
2. 修改 `projects` 数组中的项目名称、角色、周期、简介与案例章节。
3. 项目图片通过 `coverImage` 与各章节的 `image` 字段配置，新增素材后同步放入 `assets/projects/`。

## 本地预览

```bash
python3 -m http.server 4173
```

浏览器访问 `http://localhost:4173/`。

## GitHub Pages

仓库已经包含 `.github/workflows/deploy.yml`。将代码推送到 GitHub 后，在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**，之后每次推送到 `main` 分支都会自动发布。
