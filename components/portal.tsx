"use client";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Copy,
  Eye,
  EyeOff,
  FileCheck2,
  Gauge,
  KeyRound,
  LockKeyhole,
  Menu,
  Network,
  RefreshCw,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { demoUsage, requestApiAccess } from "@/lib/api";

const chartData = [42, 55, 39, 72, 65, 83, 59, 91, 76, 68, 88, 96, 79, 100];

const activityRows = [
  {
    query: "2026 世界杯最新赛程",
    profile: "balanced",
    status: "已完成",
    credits: 2,
    time: "2 分钟前",
  },
  {
    query: "近期影响华南的台风情况",
    profile: "thorough",
    status: "已完成",
    credits: 4,
    time: "1 小时前",
  },
  {
    query: "OpenAI 官方 API 更新",
    profile: "fast",
    status: "证据不足",
    credits: 1,
    time: "昨天",
  },
  {
    query: "新能源汽车出口政策核验",
    profile: "balanced",
    status: "已完成",
    credits: 2,
    time: "昨天",
  },
];

const codeSamples = {
  curl: `curl -X POST https://api.example.com/v1/research \\
  -H "Authorization: Bearer $CNWS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "帮我查询最新的世界杯赛程",
    "requirements": ["北京时间", "优先权威来源"],
    "profile": "balanced",
    "max_rounds": 3
  }'`,
  python: `import requests

response = requests.post(
    "https://api.example.com/v1/research",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "question": "帮我查询最新的世界杯赛程",
        "requirements": ["北京时间", "优先权威来源"],
        "profile": "balanced",
        "max_rounds": 3,
    },
)

job = response.json()`,
  javascript: `const response = await fetch(
  "https://api.example.com/v1/research",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${API_KEY}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: "帮我查询最新的世界杯赛程",
      requirements: ["北京时间", "优先权威来源"],
      profile: "balanced",
      max_rounds: 3
    })
  }
);`,
};

type CodeLanguage = keyof typeof codeSamples;
type ConsoleTab = "overview" | "keys" | "usage";

export function Portal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>("curl");
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("overview");
  const [copied, setCopied] = useState(false);
  const [keyVisible, setKeyVisible] = useState(false);

  const usagePercent = Math.round(
    (demoUsage.creditsUsed / demoUsage.creditsLimit) * 100,
  );
  const apiKey = keyVisible
    ? "sk_cnws_live_demo_7Lt9Yp2Z6T2"
    : "sk_cnws_live_••••••••••••Z6T2";

  const maxChartValue = useMemo(() => Math.max(...chartData), []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function handleAccessRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setRequestLoading(true);
    setRequestError("");
    try {
      await requestApiAccess({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        organization: String(form.get("organization") || ""),
        useCase: String(form.get("useCase") || ""),
        expectedVolume: String(form.get("expectedVolume") || ""),
      });
      setRequestSent(true);
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : "提交失败，请稍后重试",
      );
    } finally {
      setRequestLoading(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            onClick={() => scrollTo("top")}
            aria-label="返回首页顶部"
          >
            <span className="brand-mark" aria-hidden="true">
              <Search size={16} strokeWidth={2.4} />
            </span>
            <span>CN Web Search</span>
          </button>

          <nav className="desktop-nav" aria-label="主导航">
            <button onClick={() => scrollTo("capabilities")}>能力</button>
            <button onClick={() => scrollTo("workflow")}>工作方式</button>
            <button onClick={() => scrollTo("developers")}>开发者</button>
            <button onClick={() => scrollTo("console")}>控制台</button>
          </nav>

          <div className="header-actions">
            <button className="text-button" onClick={() => scrollTo("console")}>
              查看用量
            </button>
            <button
              className="button button-primary button-small"
              onClick={() => setRequestOpen(true)}
            >
              申请 API Key
            </button>
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
            <button onClick={() => scrollTo("capabilities")}>能力</button>
            <button onClick={() => scrollTo("workflow")}>工作方式</button>
            <button onClick={() => scrollTo("developers")}>开发者</button>
            <button onClick={() => scrollTo("console")}>控制台</button>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <HeroMesh />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" />
              为 Agent 构建的中文搜索基础设施
            </div>
            <h1>从一次提问，到一组可以核验的答案。</h1>
            <p className="hero-lead">
              完整执行多来源搜索、正文抓取、证据筛选、冲突检测与质量判断。
              不只返回链接，而是给 Agent 一份可以直接用于回答的证据包。
            </p>
            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={() => setRequestOpen(true)}
              >
                申请测试资格
                <ArrowRight size={17} />
              </button>
              <button
                className="button button-secondary"
                onClick={() => scrollTo("developers")}
              >
                <BookOpen size={17} />
                查看接入方式
              </button>
            </div>
            <div className="hero-meta">
              <span>
                <Check size={14} /> REST API
              </span>
              <span>
                <Check size={14} /> Bearer 鉴权
              </span>
              <span>
                <Check size={14} /> 异步任务
              </span>
            </div>
          </div>
          <ResearchPreview />
        </div>
      </section>

      <section className="trust-strip" aria-label="核心指标">
        <div className="container trust-grid">
          <div>
            <strong>4</strong>
            <span>个必需逻辑搜索源</span>
          </div>
          <div>
            <strong>108</strong>
            <span>个结构化来源定义</span>
          </div>
          <div>
            <strong>3</strong>
            <span>档搜索深度</span>
          </div>
          <div>
            <strong>URL</strong>
            <span>关键事实就近溯源</span>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="container">
          <SectionIntro
            eyebrow="CORE CAPABILITIES"
            title="搜索结果之外，还有判断。"
            description="服务端负责完整搜索链路，让宿主 Agent 不必在上下文中反复加载规则、知识库和网页正文。"
          />
          <div className="feature-grid">
            <FeatureCard
              icon={<Network />}
              number="01"
              title="多来源完整搜索"
              body="完整尝试 360、搜狗、Bing RSS 与 Web Search，并按意图增加定向来源和结构化学术接口。"
            />
            <FeatureCard
              icon={<FileCheck2 />}
              number="02"
              title="最小证据片段"
              body="抓取正文后提炼可引用的事实与片段，原始长正文留在服务端，减少 Agent 上下文负担。"
            />
            <FeatureCard
              icon={<Gauge />}
              number="03"
              title="质量评分与补搜"
              body="评估覆盖度、核心证据、时效性、来源独立性与冲突，识别信息缺口后生成下一轮查询。"
            />
            <FeatureCard
              icon={<ShieldCheck />}
              number="04"
              title="安全与隔离"
              body="每客户独立 Key、数据目录、额度和并发限制；默认拒绝私网抓取并限制响应体与域名并发。"
            />
          </div>
        </div>
      </section>

      <section className="dark-section" id="workflow">
        <div className="container workflow-grid">
          <div className="workflow-copy">
            <span className="dark-eyebrow">RESEARCH PIPELINE</span>
            <h2>把复杂搜索，收进一个稳定接口。</h2>
            <p>
              客户端只负责提交问题、静默轮询和读取结果。查询规划、抓取策略与质量控制全部在服务端完成。
            </p>
            <ol className="workflow-list">
              <li>
                <span>1</span>
                <div>
                  <strong>理解问题与要求</strong>
                  <p>拆分必须覆盖的信息项，识别时效性与权威来源需求。</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>并行发现与正文抓取</strong>
                  <p>完整尝试四个逻辑来源，并对候选页面去重、抓取和路由。</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>证据评分与缺口补搜</strong>
                  <p>保留事实、URL、冲突和未解决项，直到满足要求或明确不可回答。</p>
                </div>
              </li>
            </ol>
          </div>
          <PipelineVisual />
        </div>
      </section>

      <section className="section developer-section" id="developers">
        <div className="container developer-grid">
          <div className="developer-copy">
            <span className="mono-label">DEVELOPER EXPERIENCE</span>
            <h2>一个端点，接入你的 Agent。</h2>
            <p>
              使用标准 HTTP 和 Bearer Token。任务按 profile 扣除积分，状态查询、结果读取和取消不重复计费。
            </p>
            <div className="endpoint-list">
              <div>
                <span className="method post">POST</span>
                <code>/v1/research</code>
                <small>创建任务</small>
              </div>
              <div>
                <span className="method get">GET</span>
                <code>/v1/research/{"{job_id}"}</code>
                <small>查询状态</small>
              </div>
              <div>
                <span className="method get">GET</span>
                <code>/v1/research/{"{job_id}"}/result</code>
                <small>读取结果</small>
              </div>
            </div>
          </div>
          <div className="code-window">
            <div className="code-toolbar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="code-tabs">
                {(["curl", "python", "javascript"] as CodeLanguage[]).map(
                  (language) => (
                    <button
                      key={language}
                      className={codeLanguage === language ? "active" : ""}
                      onClick={() => setCodeLanguage(language)}
                    >
                      {language === "javascript" ? "JS" : language}
                    </button>
                  ),
                )}
              </div>
              <button
                className="copy-button"
                onClick={() => copyText(codeSamples[codeLanguage])}
                aria-label="复制代码"
                title="复制代码"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <pre>
              <code>{codeSamples[codeLanguage]}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="console-section" id="console">
        <div className="container">
          <div className="console-heading">
            <div>
              <span className="mono-label">CUSTOMER CONSOLE</span>
              <h2>用量、Key 和任务，一处管理。</h2>
            </div>
            <div className="preview-badge">
              <Sparkles size={14} />
              当前为演示数据
            </div>
          </div>

          <div className="console-shell">
            <aside className="console-sidebar">
              <div className="workspace-switcher">
                <span className="workspace-avatar">D</span>
                <div>
                  <strong>Demo workspace</strong>
                  <small>Starter plan</small>
                </div>
                <ChevronDown size={15} />
              </div>
              <nav aria-label="控制台导航">
                <button
                  className={consoleTab === "overview" ? "active" : ""}
                  onClick={() => setConsoleTab("overview")}
                >
                  <Activity size={17} />
                  概览
                </button>
                <button
                  className={consoleTab === "keys" ? "active" : ""}
                  onClick={() => setConsoleTab("keys")}
                >
                  <KeyRound size={17} />
                  API Keys
                </button>
                <button
                  className={consoleTab === "usage" ? "active" : ""}
                  onClick={() => setConsoleTab("usage")}
                >
                  <Gauge size={17} />
                  用量
                </button>
                <button onClick={() => scrollTo("developers")}>
                  <Code2 size={17} />
                  API 文档
                </button>
              </nav>
              <div className="sidebar-status">
                <span className="status-dot" />
                <div>
                  <strong>服务正常</strong>
                  <small>所有系统运行中</small>
                </div>
              </div>
            </aside>

            <div className="console-content">
              {consoleTab === "overview" && (
                <OverviewTab
                  usagePercent={usagePercent}
                  maxChartValue={maxChartValue}
                />
              )}
              {consoleTab === "keys" && (
                <KeysTab
                  apiKey={apiKey}
                  keyVisible={keyVisible}
                  onToggle={() => setKeyVisible((value) => !value)}
                  onCopy={() => copyText("sk_cnws_live_demo_7Lt9Yp2Z6T2")}
                  onRequest={() => setRequestOpen(true)}
                />
              )}
              {consoleTab === "usage" && (
                <UsageTab
                  usagePercent={usagePercent}
                  maxChartValue={maxChartValue}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="credit-section">
        <div className="container">
          <SectionIntro
            eyebrow="SIMPLE CREDITS"
            title="按研究深度计费，不按轮询计费。"
            description="任务被接受时预扣固定积分。状态查询、结果读取和取消操作不消耗额外积分。"
          />
          <div className="credit-grid">
            <CreditCard
              label="FAST"
              credits="1"
              title="快速事实查询"
              body="适合边界清晰、低风险的简单信息查询。"
            />
            <CreditCard
              label="BALANCED"
              credits="2"
              title="日常搜索默认"
              body="兼顾覆盖、证据质量与响应时间。"
              featured
            />
            <CreditCard
              label="THOROUGH"
              credits="4"
              title="深入研究核验"
              body="适合高风险、多要求或需要更多互证的任务。"
            />
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="mono-label">PRIVATE PREVIEW</span>
            <h2>让你的 Agent，开始使用可核验的搜索结果。</h2>
            <p>当前 API 仍以本地独立实例运行。提交申请，进入后续开放名单。</p>
          </div>
          <button
            className="button button-light"
            onClick={() => setRequestOpen(true)}
          >
            申请测试资格
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark" aria-hidden="true">
                <Search size={16} />
              </span>
              <span>CN Web Search</span>
            </div>
            <p>为中文互联网研究构建的搜索与证据基础设施。</p>
          </div>
          <div>
            <strong>产品</strong>
            <button onClick={() => scrollTo("capabilities")}>核心能力</button>
            <button onClick={() => scrollTo("workflow")}>工作方式</button>
            <button onClick={() => scrollTo("console")}>用量管理</button>
          </div>
          <div>
            <strong>开发者</strong>
            <button onClick={() => scrollTo("developers")}>快速开始</button>
            <button onClick={() => scrollTo("developers")}>API 端点</button>
            <button onClick={() => setRequestOpen(true)}>申请 Key</button>
          </div>
          <div>
            <strong>当前阶段</strong>
            <span>本地独立实例</span>
            <span>Private preview</span>
            <span>版本 0.4.0</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 CN Web Search</span>
          <span>Built for evidence-first agents.</span>
        </div>
      </footer>

      {requestOpen && (
        <AccessRequestModal
          sent={requestSent}
          loading={requestLoading}
          error={requestError}
          onClose={() => {
            setRequestOpen(false);
            setRequestSent(false);
            setRequestError("");
          }}
          onSubmit={handleAccessRequest}
        />
      )}
    </main>
  );
}

function HeroMesh() {
  return (
    <svg
      className="hero-mesh"
      viewBox="0 0 1440 720"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-blur">
          <feGaussianBlur stdDeviation="90" />
        </filter>
        <linearGradient id="mesh-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff4de" />
          <stop offset="50%" stopColor="#f7f3ff" />
          <stop offset="100%" stopColor="#eef8ff" />
        </linearGradient>
      </defs>
      <rect width="1440" height="720" fill="url(#mesh-base)" />
      <g filter="url(#hero-blur)" opacity="0.74">
        <ellipse cx="120" cy="130" rx="280" ry="210" fill="#ffb37c" />
        <ellipse cx="580" cy="40" rx="290" ry="180" fill="#f7a6d2" />
        <ellipse cx="890" cy="160" rx="340" ry="260" fill="#8f86ff" />
        <ellipse cx="1310" cy="70" rx="260" ry="230" fill="#75d5ff" />
        <ellipse cx="1110" cy="500" rx="360" ry="200" fill="#ffd891" />
      </g>
    </svg>
  );
}

function ResearchPreview() {
  return (
    <div className="research-preview">
      <div className="preview-header">
        <div>
          <span className="preview-icon">
            <Search size={16} />
          </span>
          <strong>Research job</strong>
        </div>
        <span className="completed-badge">
          <CheckCircle2 size={13} />
          Completed
        </span>
      </div>
      <div className="query-block">
        <small>QUESTION</small>
        <p>帮我查询最新的世界杯赛程，统一为北京时间。</p>
      </div>
      <div className="preview-progress">
        <div>
          <span>搜索质量</span>
          <strong>87</strong>
        </div>
        <div className="quality-bar">
          <span style={{ width: "87%" }} />
        </div>
      </div>
      <div className="evidence-list">
        <div>
          <span className="evidence-index">01</span>
          <div>
            <strong>赛程时间与阶段</strong>
            <p>来自官方赛事页面的直接证据片段</p>
          </div>
          <span className="source-chip">FIFA</span>
        </div>
        <div>
          <span className="evidence-index">02</span>
          <div>
            <strong>北京时间换算</strong>
            <p>统一时区后的结构化事实</p>
          </div>
          <span className="source-chip">CCTV</span>
        </div>
        <div>
          <span className="evidence-index">03</span>
          <div>
            <strong>冲突检查</strong>
            <p>2 个独立发布者交叉验证</p>
          </div>
          <span className="source-chip success">通过</span>
        </div>
      </div>
      <div className="preview-footer">
        <span>
          <Clock3 size={14} /> 48.2s
        </span>
        <span>12 pages fetched</span>
        <span>4 sources attempted</span>
      </div>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-intro">
      <span className="mono-label">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  number,
  title,
  body,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="feature-card">
      <div className="feature-card-top">
        <span className="feature-icon">{icon}</span>
        <span>{number}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function PipelineVisual() {
  return (
    <div className="pipeline-visual">
      <div className="pipeline-topbar">
        <span>
          <Terminal size={15} />
          research.trace
        </span>
        <span className="live-indicator">LIVE</span>
      </div>
      <div className="pipeline-query">
        <small>INPUT</small>
        <p>“查询最新政策，并核对官方原文与发布时间”</p>
      </div>
      <div className="pipeline-nodes">
        <div className="pipeline-node active">
          <span>01</span>
          <div>
            <strong>Plan</strong>
            <small>4 requirements</small>
          </div>
          <Check size={15} />
        </div>
        <div className="pipeline-connector" />
        <div className="pipeline-node active">
          <span>02</span>
          <div>
            <strong>Search</strong>
            <small>4/4 sources</small>
          </div>
          <Check size={15} />
        </div>
        <div className="pipeline-connector" />
        <div className="pipeline-node current">
          <span>03</span>
          <div>
            <strong>Curate</strong>
            <small>scoring evidence</small>
          </div>
          <RefreshCw size={15} />
        </div>
        <div className="pipeline-connector muted" />
        <div className="pipeline-node">
          <span>04</span>
          <div>
            <strong>Answer</strong>
            <small>facts + URLs</small>
          </div>
        </div>
      </div>
      <div className="pipeline-stats">
        <div>
          <span>Authority entries</span>
          <strong>103</strong>
        </div>
        <div>
          <span>Candidate pages</span>
          <strong>28</strong>
        </div>
        <div>
          <span>Evidence kept</span>
          <strong>7</strong>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({
  usagePercent,
  maxChartValue,
}: {
  usagePercent: number;
  maxChartValue: number;
}) {
  return (
    <>
      <div className="console-title-row">
        <div>
          <h3>概览</h3>
          <p>{demoUsage.periodLabel}的工作区状态与调用情况。</p>
        </div>
        <button className="console-button">
          <RefreshCw size={15} />
          刷新
        </button>
      </div>
      <div className="stat-card-grid">
        <StatCard
          label="已用积分"
          value={`${demoUsage.creditsUsed}`}
          suffix={`/ ${demoUsage.creditsLimit}`}
          note={`${usagePercent}% of monthly quota`}
          icon={<Gauge />}
        />
        <StatCard
          label="研究任务"
          value={`${demoUsage.jobsCreated}`}
          note="+18% compared to last month"
          icon={<Search />}
        />
        <StatCard
          label="可回答率"
          value={`${demoUsage.successRate}%`}
          note="completed / all terminal jobs"
          icon={<CheckCircle2 />}
        />
        <StatCard
          label="平均耗时"
          value={`${demoUsage.averageLatencySeconds}s`}
          note="balanced profile median"
          icon={<Clock3 />}
        />
      </div>
      <div className="console-panels">
        <div className="usage-chart-card">
          <div className="panel-heading">
            <div>
              <strong>调用趋势</strong>
              <span>最近 14 天</span>
            </div>
            <span className="trend-positive">+12.4%</span>
          </div>
          <UsageChart maxChartValue={maxChartValue} />
        </div>
        <div className="quota-card">
          <div className="panel-heading">
            <div>
              <strong>套餐额度</strong>
              <span>Starter</span>
            </div>
            <CircleHelp size={16} />
          </div>
          <div className="quota-number">
            <strong>{demoUsage.creditsLimit - demoUsage.creditsUsed}</strong>
            <span>积分可用</span>
          </div>
          <div className="quota-track">
            <span style={{ width: `${usagePercent}%` }} />
          </div>
          <div className="quota-details">
            <span>每分钟 {demoUsage.rateLimitPerMinute} 个任务</span>
            <span>最大并发 {demoUsage.maxActiveJobs}</span>
          </div>
        </div>
      </div>
      <ActivityTable />
    </>
  );
}

function KeysTab({
  apiKey,
  keyVisible,
  onToggle,
  onCopy,
  onRequest,
}: {
  apiKey: string;
  keyVisible: boolean;
  onToggle: () => void;
  onCopy: () => void;
  onRequest: () => void;
}) {
  return (
    <>
      <div className="console-title-row">
        <div>
          <h3>API Keys</h3>
          <p>管理用于服务端调用的访问凭据。</p>
        </div>
        <button className="console-button primary" onClick={onRequest}>
          <KeyRound size={15} />
          申请新 Key
        </button>
      </div>
      <div className="security-notice">
        <LockKeyhole size={18} />
        <div>
          <strong>不要在浏览器代码中使用真实 Key</strong>
          <p>
            正式版本只会在创建时展示一次完整 Key。请保存到服务端环境变量或密钥管理系统。
          </p>
        </div>
      </div>
      <div className="key-card">
        <div className="key-card-header">
          <div>
            <span className="key-icon">
              <KeyRound size={17} />
            </span>
            <div>
              <strong>Production key</strong>
              <span className="active-badge">Active</span>
            </div>
          </div>
          <button className="more-button">•••</button>
        </div>
        <div className="key-value">
          <code>{apiKey}</code>
          <button onClick={onToggle} aria-label={keyVisible ? "隐藏 Key" : "显示 Key"}>
            {keyVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button onClick={onCopy} aria-label="复制 Key">
            <Copy size={16} />
          </button>
        </div>
        <div className="key-meta">
          <span>创建于 2026-07-18</span>
          <span>最后使用 3 分钟前</span>
          <span>前缀 sk_cnws_live_</span>
        </div>
      </div>
      <div className="empty-key-card">
        <ServerCog size={22} />
        <div>
          <strong>自动签发接口已预留</strong>
          <p>
            <code>POST /api/keys</code> 当前返回 501。接入控制平面后，可在这里创建、轮换与撤销 Key。
          </p>
        </div>
      </div>
    </>
  );
}

function UsageTab({
  usagePercent,
  maxChartValue,
}: {
  usagePercent: number;
  maxChartValue: number;
}) {
  return (
    <>
      <div className="console-title-row">
        <div>
          <h3>用量</h3>
          <p>按搜索深度查看积分消耗与任务构成。</p>
        </div>
        <button className="console-button">
          <BookOpen size={15} />
          计费说明
        </button>
      </div>
      <div className="usage-summary">
        <div className="usage-donut" style={{ "--usage": `${usagePercent * 3.6}deg` } as React.CSSProperties}>
          <div>
            <strong>{usagePercent}%</strong>
            <span>已使用</span>
          </div>
        </div>
        <div className="profile-breakdown">
          <ProfileRow label="Fast" jobs={28} credits={28} color="#45b8d8" />
          <ProfileRow label="Balanced" jobs={16} credits={32} color="#635bff" />
          <ProfileRow label="Thorough" jobs={140} credits={560} color="#f286b7" />
        </div>
      </div>
      <div className="usage-chart-card full">
        <div className="panel-heading">
          <div>
            <strong>每日积分消耗</strong>
            <span>UTC 自然月</span>
          </div>
          <span className="date-filter">7 月 1 日—7 月 31 日</span>
        </div>
        <UsageChart maxChartValue={maxChartValue} />
      </div>
      <ActivityTable />
    </>
  );
}

function StatCard({
  label,
  value,
  suffix,
  note,
  icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  note: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="stat-card">
      <div>
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>
        {value}
        {suffix && <small>{suffix}</small>}
      </strong>
      <p>{note}</p>
    </div>
  );
}

function UsageChart({ maxChartValue }: { maxChartValue: number }) {
  return (
    <div className="chart">
      <div className="chart-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="chart-bars">
        {chartData.map((value, index) => (
          <div className="bar-column" key={`${value}-${index}`}>
            <span
              className="chart-bar"
              style={{ height: `${(value / maxChartValue) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="chart-labels">
        <span>07/01</span>
        <span>07/07</span>
        <span>07/14</span>
      </div>
    </div>
  );
}

function ActivityTable() {
  return (
    <div className="activity-card">
      <div className="panel-heading">
        <div>
          <strong>最近任务</strong>
          <span>查看搜索任务状态与积分</span>
        </div>
        <button>查看全部</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>查询</th>
              <th>Profile</th>
              <th>状态</th>
              <th>积分</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            {activityRows.map((row) => (
              <tr key={row.query}>
                <td>{row.query}</td>
                <td>
                  <span className={`profile-tag ${row.profile}`}>
                    {row.profile}
                  </span>
                </td>
                <td>
                  <span
                    className={`table-status ${
                      row.status === "已完成" ? "success" : "warning"
                    }`}
                  >
                    <span />
                    {row.status}
                  </span>
                </td>
                <td>{row.credits}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  jobs,
  credits,
  color,
}: {
  label: string;
  jobs: number;
  credits: number;
  color: string;
}) {
  return (
    <div className="profile-row">
      <span className="profile-color" style={{ backgroundColor: color }} />
      <strong>{label}</strong>
      <span>{jobs} 个任务</span>
      <span>{credits} 积分</span>
    </div>
  );
}

function CreditCard({
  label,
  credits,
  title,
  body,
  featured,
}: {
  label: string;
  credits: string;
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <article className={`credit-card ${featured ? "featured" : ""}`}>
      <div className="credit-card-header">
        <span>{label}</span>
        {featured && <small>推荐</small>}
      </div>
      <div className="credit-value">
        <strong>{credits}</strong>
        <span>积分 / 任务</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="credit-foot">
        <Check size={15} />
        固定预扣，便于预算
      </div>
    </article>
  );
}

function AccessRequestModal({
  sent,
  loading,
  error,
  onClose,
  onSubmit,
}: {
  sent: boolean;
  loading: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="关闭">
          <X size={19} />
        </button>
        {sent ? (
          <div className="success-state">
            <span>
              <Check size={24} />
            </span>
            <h2 id="request-title">已加入预览名单</h2>
            <p>
              当前表单只验证前端流程，不会持久化数据或真实签发 Key。控制平面上线后可直接替换预留接口。
            </p>
            <button className="button button-primary" onClick={onClose}>
              知道了
            </button>
          </div>
        ) : (
          <>
            <span className="mono-label">PRIVATE PREVIEW</span>
            <h2 id="request-title">申请 API 测试资格</h2>
            <p className="modal-lead">
              当前 API 仅支持本地独立实例。提交的信息用于演示申请流程，不会被保存。
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <label>
                  姓名
                  <input name="name" required placeholder="如何称呼你" />
                </label>
                <label>
                  工作邮箱
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label>
                团队或公司
                <input name="organization" placeholder="可选" />
              </label>
              <label>
                主要使用场景
                <textarea
                  name="useCase"
                  required
                  placeholder="例如：为内部 Agent 提供中文实时搜索和事实核验"
                  rows={3}
                />
              </label>
              <label>
                预计每月任务量
                <select name="expectedVolume" required defaultValue="">
                  <option value="" disabled>
                    请选择
                  </option>
                  <option value="under-100">少于 100</option>
                  <option value="100-1000">100—1,000</option>
                  <option value="1000-10000">1,000—10,000</option>
                  <option value="over-10000">10,000 以上</option>
                </select>
              </label>
              {error && <p className="form-error">{error}</p>}
              <button
                className="button button-primary submit-button"
                disabled={loading}
              >
                {loading ? "正在提交…" : "提交申请"}
                {!loading && <ArrowRight size={17} />}
              </button>
              <p className="form-footnote">
                提交即表示你了解当前功能处于演示阶段，暂不自动生成 API Key。
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
