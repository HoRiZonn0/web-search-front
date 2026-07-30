import { NextResponse } from "next/server";

import { demoUsage } from "@/lib/api";

export async function GET() {
  // Future contract:
  // 1. authenticate the portal session;
  // 2. resolve customer_id server-side;
  // 3. request the control plane, never exposing a CNWS API Key to the browser.
  return NextResponse.json({
    ...demoUsage,
    source: "demo",
  });
}
