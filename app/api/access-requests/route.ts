import { NextResponse } from "next/server";

const requiredFields = ["name", "email", "useCase", "expectedVolume"] as const;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (
    !payload ||
    requiredFields.some(
      (field) => typeof payload[field] !== "string" || !payload[field].trim(),
    )
  ) {
    return NextResponse.json(
      { error: "missing_required_fields" },
      { status: 400 },
    );
  }

  // Placeholder contract: replace this route with the future customer,
  // provisioning and notification service. No request is persisted today.
  return NextResponse.json(
    {
      request_id: `req_preview_${Date.now().toString(36)}`,
      status: "waitlist",
      persistence: "none",
      message: "申请已在预览模式中接收。正式开放后，我们会在这里完成审核与 Key 发放。",
    },
    { status: 202 },
  );
}
