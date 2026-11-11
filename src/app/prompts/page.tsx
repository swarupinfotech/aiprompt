import Link from "next/link";
import { Search, SlidersHorizontal, Copy } from "lucide-react";
import { Badge, Card, Container, SectionHeading } from "@/components/ui";
import { categories, promptCatalog } from "@/lib/data";

export default function PromptIndexPage() {
  const prompts = promptCatalog.slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="py-12">
        <SectionHeading eyebrow="Prompt library" title="Explore prompts" description="Search a curated collection of high-performing prompts for real-world work." />
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search prompts, tags, or phrases" className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-300" />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.slice(0, 10).map((category) => (
            <button key={category} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-violet-200 hover:text-violet-700">
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-violet-500 via-purple-500 to-sky-500" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Badge>{prompt.category}</Badge>
                  <span className="text-xs text-slate-500">{prompt.copyCount} copies</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{prompt.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{prompt.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">#{tag}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
                    <Copy className="h-3.5 w-3.5" /> Quick Copy
                  </button>
                  <Link href={`/prompts/${prompt.slug}`} className="text-sm font-semibold text-violet-600 hover:text-violet-500">
                    View Details
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">Previous</button>
          <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">1</span>
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">Next</button>
        </div>
      </Container>
    </main>
  );
}
