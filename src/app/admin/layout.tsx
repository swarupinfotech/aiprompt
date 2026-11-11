import Link from "next/link";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-bold text-slate-900">AI Prompt Library</Link>
          <Link href="/admin/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Admin</Link>
        </div>
      </header>
      {children}
    </div>
  );
}
