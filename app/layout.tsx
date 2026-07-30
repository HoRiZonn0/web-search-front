import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CN Web Search API — 面向 Agent 的中文搜索基础设施",
  description:
    "完整执行多来源搜索、正文抓取、证据筛选与质量判断，为 Agent 返回可核验的结构化搜索结果。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
