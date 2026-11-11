import Link from "next/link";
import { ArrowLeft, Copy } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge, Card, Container } from "@/components/ui";
import { promptCatalog } from "@/lib/data";

export function generateStaticParams() {
  return promptCatalog.map((prompt) => ({ slug: prompt.slug }));
}

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  const prompt = promptCatalog.find((item) => item.slug === params.slug);
  if (!prompt) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="py-12">
        <Link href="/prompts" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-700">
          <ArrowLeft className="h-4 w-4" /> Back to prompts
        </Link>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_0.85fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge>{prompt.category}</Badge>
              <span className="text-sm text-slate-500">{prompt.difficulty}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{prompt.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{prompt.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">#{tag}</span>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="h-72 rounded-[22px] bg-gradient-to-br from-violet-500 via-purple-500 to-sky-500" />
            </div>

            <Card className="mt-8 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Prompt</h2>
                <button className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">
                  <Copy className="h-4 w-4" /> Copy prompt
                </button>
              </div>
              <pre className="whitespace-pre-wrap rounded-2xl bg-slate-900 p-5 text-sm leading-7 text-slate-100">{prompt.promptContent}</pre>
            </Card>

            <Card className="mt-8 p-6">
              <h2 className="text-2xl font-bold text-slate-900">Customizable variables</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {prompt.customizableVars.map((variable) => (
                  <li key={variable} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">[{variable}]</li>
                ))}
              </ul>
            </Card>

            <Card className="mt-8 p-6">
              <h2 className="text-2xl font-bold text-slate-900">How to use this prompt</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{prompt.instructions}</p>
            </Card>

            <Card className="mt-8 p-6">
              <h2 className="text-2xl font-bold text-slate-900">Example input</h2>
              <pre className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-700">{prompt.exampleInput}</pre>
              <h3 className="mt-6 text-xl font-bold text-slate-900">Example output</h3>
              <pre className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-7 text-slate-700">{prompt.exampleOutput}</pre>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="p-5">
              <h3 className="mb-4 text-lg font-bold text-slate-900">Prompt details</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4"><span>Compatible tools</span><span className="font-medium text-slate-900">{prompt.compatibleTools.join(", ")}</span></div>
                <div className="flex justify-between gap-4"><span>Views</span><span className="font-medium text-slate-900">{prompt.viewCount}</span></div>
                <div className="flex justify-between gap-4"><span>Copies</span><span className="font-medium text-slate-900">{prompt.copyCount}</span></div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Best practices</h3>
              <p className="text-sm leading-7 text-slate-600">{prompt.tips}</p>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Related prompts</h3>
              <div className="space-y-3">
                {promptCatalog.slice(0, 3).map((item) => (
                  <Link key={item.id} href={`/prompts/${item.slug}`} className="block rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:border-violet-200 hover:text-violet-700">
                    {item.title}
                  </Link>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </main>
  );
}
