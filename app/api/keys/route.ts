import { NextResponse } from "next/server";

export async function POST() {
  // Reserved for the future control plane. Key material must be created and
  // returned by a trusted backend, never generated in browser JavaScript.
  return NextResponse.json(
    {
      error: "not_implemented",
      message: "API Key 自动签发尚未开放。",
    },
    { status: 501 },
  );
}
