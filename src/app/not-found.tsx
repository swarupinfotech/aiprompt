import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">404</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">Prompt not found</h1>
        <p className="mt-4 text-slate-600">The prompt you are looking for may have moved or no longer exists.</p>
        <Link href="/prompts" className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          Browse prompts
        </Link>
      </div>
    </main>
  );
}
