import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getAdminSession } from "@/lib/auth";
import { getPromptStats, getRecentPrompts } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function AdminOverview() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [{ promptCount, categoryCount, contactCount, totalViews }, latestPrompts] = await Promise.all([
    getPromptStats(),
    getRecentPrompts(6),
  ]);

  const stats = [
    { label: "Published prompts", value: promptCount },
    { label: "Categories", value: categoryCount },
    { label: "Saved messages", value: contactCount },
    { label: "Total views", value: totalViews },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Overview</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Admin dashboard</h1>
        </div>
        <Link href="/admin/login" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Switch account</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent prompts</h2>
            <Link href="/prompts" className="text-sm font-semibold text-violet-600">View library</Link>
          </div>
          <div className="space-y-3">
            {latestPrompts.map((prompt) => {
              const categoryName = typeof prompt.category === "string" ? prompt.category : prompt.category?.name ?? "General";
              return (
                <div key={prompt.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{prompt.title}</p>
                    <p className="text-xs text-slate-500">{categoryName}</p>
                  </div>
                  <span className="text-xs font-medium text-violet-700">{prompt.published ? "Published" : "Draft"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Admin tools</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• Create and publish new prompts</li>
            <li>• Manage SEO metadata and tags</li>
            <li>• Configure homepage sections</li>
            <li>• Review contact messages and analytics</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="px-4 py-10 text-slate-600">Loading admin dashboard...</div>}>
      <AdminOverview />
    </Suspense>
  );
}
