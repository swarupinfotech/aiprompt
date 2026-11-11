import { Container } from "@/components/ui";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Disclaimer</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">Important use notice</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
          <p>AI-generated outputs may require review, customization, and fact-checking before being used in production or sensitive contexts.</p>
          <p>We do not guarantee outcome quality or accuracy in all scenarios, and users are responsible for final judgment and validation.</p>
        </div>
      </Container>
    </main>
  );
}
