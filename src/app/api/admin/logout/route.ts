import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "ai_prompt_admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "lax",
  });
  return response;
}
