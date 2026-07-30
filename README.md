# CN Web Search API Portal

CN Web Search API 的产品介绍、API Key 申请与客户用量管理前端。

当前版本是可交互、可静态部署的商业门户原型：

- 产品能力、搜索链路和积分模型均来自现有 `cn-web-search-mcp`；
- API Key 申请表在演示模式中只模拟成功，不会持久化数据；
- 用量、任务和 Key 列表使用演示数据；
- 浏览器不会读取或保存真实的 CN Web Search API Key。

## 本地运行

```powershell
npm install
npm run dev
```

打开 `http://127.0.0.1:3000`。

生产构建：

```powershell
npm run build
npm start
```

## 已预留接口

完整接口契约保存在 [`contracts/control-plane.openapi.yaml`](contracts/control-plane.openapi.yaml)：

| 方法 | 路径 | 当前前端行为 | 后续实现 |
|---|---|---|---|
| `POST` | `/api/access-requests` | 演示模式本地模拟 `waitlist` | 接客户申请、审核与通知服务 |
| `GET` | `/api/account/usage` | 返回演示用量 | 按登录会话查询控制平面 |
| `POST` | `/api/keys` | 界面明确标记尚未开放 | 创建、轮换和撤销 Key |

正式接入时应由门户后端完成身份认证和客户映射，再访问控制平面。不要让浏览器直接持有客户的搜索 API Key。

## 主要目录

```text
app/                    Next.js 静态页面
components/portal.tsx   门户界面和交互
lib/api.ts              前端 API 适配层
lib/types.ts            数据契约
contracts/              后续控制平面 OpenAPI 契约
scripts/visual-check.mjs 响应式视觉检查
.openai/hosting.json    Sites 项目标识
```
