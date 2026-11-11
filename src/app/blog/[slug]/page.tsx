import { notFound } from "next/navigation";
import { Container } from "@/components/ui";

const articleMap: Record<string, { title: string; content: string }> = {
  "better-chatgpt-prompts": {
    title: "How to Write Better ChatGPT Prompts",
    content: "Start with a clear goal, narrow the audience context, and specify the format or output you need. Strong prompts include role, objective, constraints, and expected result. This reduces ambiguity and improves speed and quality.",
  },
  "ai-prompts-for-productivity": {
    title: "How AI Prompts Improve Productivity",
    content: "Reusable prompts save time by codifying repeatable steps for planning, summarizing, brainstorming, and decision-making. When paired with a clear process, prompt libraries help people work faster without sacrificing quality.",
  },
  "ai-prompts-for-developers": {
    title: "Best AI Prompts for Software Developers",
    content: "Developers benefit from prompts that clarify context, expected formats, and technical constraints. These prompts can support debugging, refactoring, writing tests, and summarizing system architecture.",
  },
};

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articleMap[params.slug];
  if (!article) return notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Article</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">{article.title}</h1>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-base leading-8 text-slate-600">{article.content}</p>
        </div>
      </Container>
    </main>
  );
}
