import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center justify-center px-4 py-16">
      <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-sky-500 p-8 text-white shadow-2xl shadow-violet-200">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">Secure control panel</p>
          <h1 className="text-4xl font-black tracking-tight">Manage prompts, insights, and publishing.</h1>
          <p className="max-w-md text-violet-100/90">
            Use the dashboard to review analytics, publish new prompts, and maintain the library.
          </p>
          <ul className="space-y-3 text-sm text-violet-50">
            <li>• Prompt publishing and moderation</li>
            <li>• Category and tag setup</li>
            <li>• Search and traffic insights</li>
          </ul>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
