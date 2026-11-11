import { NextResponse } from "next/server";
import { setAdminSessionCookie } from "@/lib/auth";
import { verifyAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  const normalizedEmail = email ?? "";
  if (!normalizedEmail || !password || !(await verifyAdminCredentials(normalizedEmail, password))) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, message: "Signed in successfully." });
  response.cookies.set(await setAdminSessionCookie(normalizedEmail));
  return response;
}
