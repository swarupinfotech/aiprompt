import Link from "next/link";
import { Container } from "@/components/ui";

const posts = [
  { slug: "better-chatgpt-prompts", title: "How to Write Better ChatGPT Prompts", excerpt: "A practical guide for creating clear and high-performing prompts." },
  { slug: "ai-prompts-for-productivity", title: "How AI Prompts Improve Productivity", excerpt: "Reduce repetitive work and clear the noise from your daily workflow." },
  { slug: "ai-prompts-for-developers", title: "Best AI Prompts for Software Developers", excerpt: "Learn prompt patterns that support debugging, planning, and writing better code." },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Blog</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">AI learning resources</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-sky-500" />
              <h2 className="mt-5 text-xl font-bold text-slate-900">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-violet-600">Read article →</Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
