import { Container } from "@/components/ui";

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Editorial policy</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">Quality, clarity, and review standards</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
          <p>Our content is reviewed for usefulness, relevance, and factual clarity before publication.</p>
          <p>We favor original practical guidance over generic filler and aim for content that helps users make real progress.</p>
        </div>
      </Container>
    </main>
  );
}
