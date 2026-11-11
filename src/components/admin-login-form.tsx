"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Login failed.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Admin access</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Sign in</h1>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Email
        <input name="email" type="email" defaultValue="admin@promptlibrary.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" required />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Password
        <input name="password" type="password" defaultValue="admin123" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" required />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" disabled={loading} className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
        {loading ? "Signing in..." : "Access dashboard"}
      </button>
    </form>
  );
}
