import { NextResponse } from "next/server";
import { setAdminSessionCookie } from "@/lib/auth";
import { getAdminUser } from "@/lib/db";

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  const normalizedEmail = email ?? "";
  const user = normalizedEmail ? getAdminUser(normalizedEmail) : undefined;

  if (!user || !password || user.password !== password) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, message: "Signed in successfully." });
  response.cookies.set(setAdminSessionCookie(normalizedEmail));
  return response;
}
