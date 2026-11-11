import { cookies } from "next/headers";

const cookieName = "ai_prompt_admin_session";

export type AdminSessionPayload = {
  email: string;
  role: "admin";
};

export function createAdminSession(payload: AdminSessionPayload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function verifyAdminSession(rawValue?: string | null) {
  if (!rawValue) return null;

  try {
    const decoded = JSON.parse(Buffer.from(rawValue, "base64url").toString("utf8")) as AdminSessionPayload;
    if (decoded.role !== "admin" || !decoded.email) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = verifyAdminSession(cookieStore.get(cookieName)?.value);
  return !!session;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(cookieName)?.value);
}

export function clearAdminSessionCookie() {
  return {
    name: cookieName,
    value: "",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
  };
}

export function setAdminSessionCookie(email: string) {
  return {
    name: cookieName,
    value: createAdminSession({ email, role: "admin" }),
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  };
}
