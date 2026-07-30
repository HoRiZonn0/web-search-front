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
  const response = await fetch("/api/account/usage", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("无法获取用量信息");
  }
  return response.json();
}
