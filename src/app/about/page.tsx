import { Container } from "@/components/ui";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">About us</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">Helping people use AI with clearer prompts and better workflows.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            AI Prompt Library is built for students, creators, teams, and founders who want practical AI support without the guesswork. We curate original prompt frameworks that are reusable, realistic, and designed around common work tasks.
          </p>
        </div>
      </Container>
    </main>
  );
}
