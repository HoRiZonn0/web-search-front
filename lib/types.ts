export type UsageSummary = {
  customerId: string;
  plan: string;
  periodLabel: string;
  creditsUsed: number;
  creditsLimit: number;
  jobsCreated: number;
  successRate: number;
  averageLatencySeconds: number;
  rateLimitPerMinute: number;
  maxActiveJobs: number;
};

export type AccessRequest = {
  name: string;
  email: string;
  organization?: string;
  useCase: string;
  expectedVolume: string;
};

export type AccessRequestResponse = {
  requestId: string;
  status: "waitlist";
  message: string;
};
