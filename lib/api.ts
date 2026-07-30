import type {
  AccessRequest,
  AccessRequestResponse,
  UsageSummary,
} from "@/lib/types";

export const demoUsage: UsageSummary = {
  customerId: "demo-workspace",
  plan: "Starter",
  periodLabel: "2026 年 7 月",
  creditsUsed: 620,
  creditsLimit: 1000,
  jobsCreated: 184,
  successRate: 91.8,
  averageLatencySeconds: 48.2,
  rateLimitPerMinute: 5,
  maxActiveJobs: 2,
};

export async function requestApiAccess(
  payload: AccessRequest,
): Promise<AccessRequestResponse> {
  if (process.env.NEXT_PUBLIC_PORTAL_MODE !== "connected") {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    return {
      requestId: `req_preview_${Date.now().toString(36)}`,
      status: "waitlist",
      message:
        "申请已在预览模式中接收。正式开放后，我们会在这里完成审核与 Key 发放。",
    };
  }

  const response = await fetch("/api/access-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("提交失败，请稍后重试");
  }

  const data = await response.json();
  return {
    requestId: data.request_id,
    status: data.status,
    message: data.message,
  };
}

export async function getUsage(): Promise<UsageSummary> {
  if (process.env.NEXT_PUBLIC_PORTAL_MODE !== "connected") {
    return demoUsage;
  }

  const response = await fetch("/api/account/usage", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("无法获取用量信息");
  }
  return response.json();
}
