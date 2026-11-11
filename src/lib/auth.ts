import { cookies } from "next/headers";

const cookieName = "ai_prompt_admin_session";
const textEncoder = new TextEncoder();

export type AdminSessionPayload = {
  email: string;
  role: "admin";
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "local-development-only-secret";
  throw new Error("AUTH_SECRET must be set in production.");
}

function encodeBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getSigningKey(usage: KeyUsage[]) {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usage,
  );
}

export async function createAdminSession(payload: AdminSessionPayload) {
  const encodedPayload = encodeBase64Url(textEncoder.encode(JSON.stringify(payload)));
  const key = await getSigningKey(["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(encodedPayload));
  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSession(rawValue?: string | null) {
  if (!rawValue) return null;

  const key = await getSigningKey(["verify"]);
  const [encodedPayload, encodedSignature, ...extra] = rawValue.split(".");
  if (!encodedPayload || !encodedSignature || extra.length > 0) return null;

  try {
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      decodeBase64Url(encodedSignature),
      textEncoder.encode(encodedPayload),
    );
    if (!isValid) return null;

    const decoded = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload))) as AdminSessionPayload;
    if (decoded.role !== "admin" || !decoded.email) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = await verifyAdminSession(cookieStore.get(cookieName)?.value);
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

export async function setAdminSessionCookie(email: string) {
  return {
    name: cookieName,
    value: await createAdminSession({ email, role: "admin" }),
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  };
}
