import { Container } from "@/components/ui";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Terms</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">Website usage terms</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
          <p>Users may browse and copy prompts for personal or professional use in compliance with our guidelines.</p>
          <p>Prompt content is provided as educational and productivity support, not legal, medical, or financial advice.</p>
          <p>We reserve the right to remove or adjust content that violates quality, policy, or editorial standards.</p>
        </div>
      </Container>
    </main>
  );
}
