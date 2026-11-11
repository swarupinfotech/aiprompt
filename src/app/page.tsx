import Link from "next/link";
import { ArrowRight, Copy, Search, Star, TrendingUp, Wand2 } from "lucide-react";
import { Container, SectionHeading, Badge, Card } from "@/components/ui";
import { categories, featuredPrompts, mostCopiedPrompts, recentlyAdded, trendingPrompts } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <Container className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-bold text-white shadow-lg shadow-violet-200">
              AI
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">AI Prompt Library</div>
              <div className="text-xs text-slate-500">Free prompt discovery</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="#categories">Categories</Link>
            <Link href="#trending">Trending</Link>
            <Link href="#recent">Recently Added</Link>
            <Link href="#faqs">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/prompts" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 md:inline-flex">
              Browse prompts
            </Link>
            <Link href="/prompts" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-200 hover:bg-slate-800">
              Explore Prompts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),transparent_30%)]" />
        <Container className="relative py-20 md:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Badge className="mb-6">1,000+ prompt library</Badge>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find the Perfect AI Prompt for Every Task
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Explore 1,000+ powerful AI prompts for ChatGPT, image generation, business, coding, marketing, education and productivity. Copy, customize and create for free.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/prompts" className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-200 hover:bg-violet-500">
                  Explore Prompts <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#categories" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:border-slate-300">
                  Browse Categories
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9/5 user rating</div>
                <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-500" /> 12k monthly saves</div>
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_25px_70px_-30px_rgba(79,70,229,0.45)]">
              <div className="rounded-[22px] bg-slate-900 p-5 text-white">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300"><Search className="h-4 w-4" /> Prompt search</div>
                  <Badge className="border-violet-400 bg-violet-500/10 text-violet-100">Live</Badge>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                    <Search className="h-4 w-4 text-violet-300" />
                    <span>Search prompts for coding, marketing, design...</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Customer onboarding",
                      "Content calendar",
                      "Productivity planner",
                      "Code review prompt",
                    ].map((chip) => (
                      <button key={chip} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-100 hover:bg-white/10">
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="categories" className="py-20">
        <Container>
          <SectionHeading eyebrow="Categories" title="Explore by use case" description="Jump into curated prompt collections for every role and workflow." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 12).map((category) => (
              <Card key={category} className="p-5 transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Wand2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{category}</h3>
                <p className="mt-2 text-sm text-slate-600">High-performing prompts for {category.toLowerCase()} workflows.</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="trending" className="bg-white py-20">
        <Container>
          <SectionHeading eyebrow="Trending" title="Most used prompts this week" description="Popular prompts across marketing, coding, business, and content creation." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trendingPrompts.map((prompt) => (
              <Card key={prompt.id} className="overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-violet-500 via-purple-500 to-sky-500" />
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge>{prompt.category}</Badge>
                    <span className="text-xs font-medium text-slate-500">{prompt.copyCount} copies</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{prompt.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{prompt.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </button>
                    <Link href={`/prompts/${prompt.slug}`} className="text-sm font-semibold text-violet-600 hover:text-violet-500">
                      View details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="recent" className="py-20">
        <Container>
          <SectionHeading eyebrow="Recently added" title="Fresh prompt ideas" description="New prompts optimized for modern workflows and AI tools." />
          <div className="grid gap-6 lg:grid-cols-3">
            {recentlyAdded.map((prompt) => (
              <Card key={prompt.id} className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Badge>{prompt.category}</Badge>
                  <span className="text-xs text-slate-500">{prompt.difficulty}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{prompt.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{prompt.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <Container>
          <SectionHeading eyebrow="Featured" title="High-performing prompt collections" description="Curated stacks built for serious productivity, research, and growth." />
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredPrompts.map((prompt) => (
              <Card key={prompt.id} className="border-slate-700 bg-slate-800 p-6 text-white">
                <div className="mb-4 flex items-center justify-between">
                  <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-200">{prompt.category}</Badge>
                  <span className="text-xs text-slate-300">{prompt.viewCount} views</span>
                </div>
                <h3 className="text-2xl font-bold">{prompt.title}</h3>
                <p className="mt-3 text-slate-300">{prompt.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-600 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/prompts/${prompt.slug}`} className="text-violet-300 hover:text-violet-200">Details →</Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Copy leaders" title="Most copied prompts" description="The prompts people return to again and again for results." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {mostCopiedPrompts.map((prompt) => (
              <Card key={prompt.id} className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600">#{mostCopiedPrompts.indexOf(prompt) + 1}</span>
                  <span className="text-sm font-medium text-slate-500">{prompt.copyCount}× copied</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{prompt.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{prompt.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading eyebrow="Resources" title="AI tools directory" description="Use the right AI tool for the right workflow." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "ChatGPT",
              "Claude",
              "Gemini",
              "Midjourney",
              "Stable Diffusion",
              "Perplexity",
            ].map((tool) => (
              <Card key={tool} className="p-5">
                <h3 className="text-xl font-bold text-slate-900">{tool}</h3>
                <p className="mt-2 text-sm text-slate-600">Recommended prompts and workflows for {tool} users.</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Learn" title="Latest AI tutorials" description="Actionable guides to make prompts more effective and consistent." />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              "How to Write Better ChatGPT Prompts",
              "AI Prompts Improve Productivity",
              "Best AI Prompts for Developers",
            ].map((article, index) => (
              <Card key={article} className="overflow-hidden p-0">
                <div className={`h-40 bg-gradient-to-br ${index % 2 === 0 ? "from-fuchsia-500 to-violet-500" : "from-blue-500 to-cyan-500"}`} />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900">{article}</h3>
                  <p className="mt-3 text-sm text-slate-600">Practical examples, frameworks, and use cases for real work.</p>
                  <Link href="#" className="mt-4 inline-flex text-sm font-semibold text-violet-600">Read article →</Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-900 py-20 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Why use us" title="Build better outputs with better prompts" description="From students and marketers to engineers and founders, our prompt library helps you move faster and think clearer." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Free to use",
                "Searchable library",
                "Prompt customization",
                "Copy-ready formats",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-sm font-medium text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="faqs" className="py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" description="Answers to common prompt library questions." />
          <div className="grid gap-4">
            {[
              "Do I need an account to copy a prompt?",
              "Are prompts free to use?",
              "Can I customize prompt variables?",
            ].map((question) => (
              <div key={question} className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-700">
                <h3 className="text-lg font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Yes. Our platform is designed to be accessible and useful without mandatory registration so users can copy and adapt prompts immediately.</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Stay in the loop</h3>
            <p className="mt-2 text-slate-600">Get new prompt ideas, tutorials, and product updates.</p>
          </div>
          <div className="flex w-full max-w-xl gap-3">
            <input placeholder="Your email address" className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 focus:border-violet-300" />
            <button className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Subscribe</button>
          </div>
        </Container>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <Container className="grid gap-10 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-bold text-white">AI</div>
              <div>
                <div className="text-lg font-bold text-white">AI Prompt Library</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">Discover powerful prompts and turn ideas into results faster.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/prompts">Browse prompts</Link></li>
              <li><Link href="#categories">Categories</Link></li>
              <li><Link href="#faqs">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Resources</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </Container>
      </footer>
    </main>
  );
}
