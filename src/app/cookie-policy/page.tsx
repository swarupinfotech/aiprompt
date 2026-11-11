import { Container } from "@/components/ui";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Cookie policy</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">How we use cookies</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
          <p>We use cookies to remember theme settings, improve navigation, and measure broad performance trends.</p>
          <p>Optional analytics cookies may be disabled when local consent settings or legal requirements require it.</p>
        </div>
      </Container>
    </main>
  );
}
