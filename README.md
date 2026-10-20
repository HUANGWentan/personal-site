# Wentan Huang — 个人介绍网站

**线上地址：<https://wentan-huang-site.onrender.com>**（Render Static Site，免费档）

纯静态站点：一个 `index.html` + 一份 CSS + 40 行 JS，**没有构建步骤、没有依赖、没有外部字体或 CDN**。
可直接部署到 Render Static Site（免费档），也可以放到任何静态托管上。

```
site/
├── index.html      ← 页面内容和文案都在这里
├── styles.css      ← 全部样式（黑白极简 + 自动深色模式）
├── main.js         ← 主题切换、深圳当前时间、滚动淡入
├── favicon.svg     ← 站点图标
├── og.png          ← 分享到微信/X/LinkedIn 时的缩略图
├── 404.html        ← 找不到页面时的兜底
├── robots.txt
└── render.yaml     ← Render Blueprint，用来一键建站
```

## 本地预览

双击 `index.html` 就能看。或者起一个本地服务（更接近线上环境）：

```bash
cd site
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署到 Render（免费静态站）

当前线上实例（已经建好）：

| 项 | 值 |
|---|---|
| URL | <https://wentan-huang-site.onrender.com> |
| Service ID | `srv-dbbglpvf3r2c738rcpc0` |
| Publish Path | `.` |
| Build Command | 空 |
| 仓库 | <https://github.com/HUANGWentan/personal-site> |

**注意：自动部署目前没有接通。** 这个服务是用 Render API + 公开仓库直接创建的，没有经过 Render 的 GitHub App 授权，所以 `git push` 不会自动触发部署。改完内容后二选一：

```bash
# 方式 1：命令行手动触发（需要 Render API Key）
curl -X POST https://api.render.com/v1/services/srv-dbbglpvf3r2c738rcpc0/deploys \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"clearCache":"do_not_clear"}'

# 方式 2：Render 面板 → 该服务 → Manual Deploy → Deploy latest commit
```

想恢复「push 即部署」：Render 面板 → 该 Static Site → **Settings → Build & Deploy → Connect repo**，授权 GitHub 一次即可。

### 从零重建（可选）

### 方式 A：面板点三下（最稳）

1. 把这个 `site/` 目录推到一个 GitHub 仓库（公开或私有都行）。
2. 打开 [dashboard.render.com](https://dashboard.render.com) → **New +** → **Static Site**。
3. 选中该仓库 →
   - **Build Command**：留空
   - **Publish Directory**：`.`
4. 点 **Create Static Site**，等 30 秒左右，拿到 `https://<名字>.onrender.com`。

### 方式 B：Blueprint（仓库里已有 render.yaml）

**New +** → **Blueprint** → 选中仓库 → **Apply**。Render 会读 `render.yaml` 自动建站。

### 方式 C：REST API

用 Render API Key 直接创建，字段参考：[Create service](https://api-docs.render.com/reference/create-service)

```bash
curl -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "static_site",
    "name": "wentan-huang-site",
    "ownerId": "OWNER_ID",
    "repo": "https://github.com/<you>/<repo>",
    "branch": "main",
    "buildCommand": "",
    "staticPublishPath": "."
  }'
```

## 上线前要改的 4 处

都在 `index.html` 里，搜 `TODO` 就能定位：

| 位置 | 现在写的 | 改成 |
|---|---|---|
| `mailto:`（2 处） | `hello@example.com` | 你的真实邮箱 |
| GitHub 链接（2 处，已注释） | — | 放开注释并换成你的主页 |
| Selected work 三条 | 按你本地项目目录写的草稿 | 你想公开的项目/经历 |
| `og:url` / `canonical` | `https://your-domain.com/` | 绑定域名后改成真实地址 |

`<title>`、`<meta name="description">`、JSON-LD 里的信息也一并核对一遍。

## 绑定自己的域名

Render 面板 → 该 Static Site → **Settings → Custom Domains** → 添加域名，按提示在 DNS 加一条 `CNAME`。
证书自动签发，免费的。域名每年约 ¥60–100，是这件事里唯一要花钱的部分。

## 免费额度

Render 静态站免费，不按流量计费（合理使用范围内）。超过 100 GB/月 或需要更强的边缘缓存再考虑升级。
