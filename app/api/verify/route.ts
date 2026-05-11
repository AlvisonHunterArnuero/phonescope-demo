import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  const apiKey = process.env.VERIPHONE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const params = new URLSearchParams({ key: apiKey, phone });
    const res = await fetch(`https://api.veriphone.io/v2/verify?${params}`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 300 }, // cache for 5 mins
    });

    if (!res.ok) {
      throw new Error(`Veriphone API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
