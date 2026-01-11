import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(
    "http://34.130.233.222:8008/iv3tools/sql_emb_serp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "LLM backend error" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
