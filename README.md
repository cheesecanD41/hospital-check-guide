# 医院医疗项目科普

面向普通患者的检查与治疗项目原理说明站：从科室进入，查看该科室下的检查项目，再阅读单个项目的原理、准备事项、检查过程与结果解读。

全部内容为本地静态数据，不依赖后端，克隆后即可本地运行。

## 技术栈

- React 19 + TypeScript
- Vite 7
- React Router 7
- 原生 CSS（设计变量集中在 `src/styles/tokens.css`）

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 路由

- `/`：首页与全站搜索
- `/departments`：科室总览
- `/departments/:departmentSlug`：科室详情、条件筛选
- `/projects/:projectSlug`：项目详情
- `/about`：关于与免责声明

## 目录结构

```
src/
  components/   导航、面包屑、搜索、筛选、信息栏等通用组件
  data/         科室与项目数据（departments.ts、projects.ts、types.ts）
  pages/        5 个路由页面
  styles/       tokens.css（颜色、字号、间距）、base.css（版式与组件样式）
```

## 内容规模

9 个科室、38 个项目，覆盖影像与超声、检验、心血管、消化内镜、呼吸、眼科、耳鼻喉、妇产、功能检查。

## 如何新增一个项目

1. 在 `src/data/projects.ts` 中按 `Project` 类型追加一条数据，`departmentSlug` 指向已有科室。
2. 首页、科室页、搜索与相关推荐均自动读取，无需改动页面代码。

## 免责声明

本站内容仅用于科普，不构成诊断或治疗建议。检查项目的实际流程、准备要求与风险以接诊医生和所在医院的安排为准。

## 许可证

[MIT](LICENSE)
