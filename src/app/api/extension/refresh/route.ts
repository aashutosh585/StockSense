import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: true, timestamp: Date.now() });
}

export async function GET() {
  return NextResponse.json({ success: true, timestamp: Date.now() });
}
