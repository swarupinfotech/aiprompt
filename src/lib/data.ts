export type PromptRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  compatibleTools: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  promptContent: string;
  customizableVars: string[];
  instructions: string;
  exampleInput: string;
  exampleOutput: string;
  tips: string;
  imageUrl: string;
  imageAlt: string;
  seoTitle: string;
  metaDescription: string;
  copyCount: number;
  viewCount: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export const categories = [
  "Productivity",
  "Coding",
  "Marketing",
  "Business",
  "Education",
  "Design",
  "Content Creation",
  "SEO",
  "Social Media",
  "Email Marketing",
  "E-commerce",
  "HR & Recruiting",
  "Customer Support",
  "Sales",
  "Project Management",
  "Research",
  "Finance",
  "Legal",
  "Healthcare",
  "Travel",
  "Lifestyle",
  "Personal Development",
  "Data Analysis",
  "AI Strategy",
  "Creative Writing",
  "Video Production",
] as const;

const toolSets = [
  ["ChatGPT", "Claude", "Gemini"],
  ["ChatGPT", "Perplexity", "Claude"],
  ["ChatGPT", "Gemini", "Midjourney"],
  ["Claude", "Gemini", "Notion AI"],
  ["ChatGPT", "Copilot", "Perplexity"],
];

const categoryTemplates = {
  Productivity: ["Workflow Optimizer", "Daily Focus Planner", "Inbox Zero System", "Meeting Summarizer"],
  Coding: ["Bug Fix Assistant", "Code Review Critic", "Refactor Planner", "API Design Evaluator"],
  Marketing: ["Campaign Brief Builder", "Audience Persona Architect", "Landing Page Copywriter", "Offer Positioning Strategist"],
  Business: ["Growth Strategy Planner", "Decision Memo Generator", "Executive Brief Composer", "Operations Audit Analyst"],
  Education: ["Study Plan Architect", "Lesson Plan Builder", "Assignment Feedback Coach", "Learning Roadmap Designer"],
  Design: ["Brand Moodboard Creator", "UX Critique Partner", "Landing Page Wireframe Prompt", "Visual Hierarchy Optimizer"],
  "Content Creation": ["Content Calendar Generator", "Article Outline Builder", "Video Script Composer", "Newsletter Ideation Engine"],
  SEO: ["Keyword Cluster Builder", "SERP Content Optimizer", "Internal Linking Strategist", "Technical SEO Audit Prompt"],
  "Social Media": ["Post Scheduler Planner", "Hook Generator", "Engagement Comment Strategist", "Trend Adaptation Prompt"],
  "Email Marketing": ["Sequence Draft Generator", "Subject Line Optimizer", "Lead Nurture Planner", "Re-engagement Email Builder"],
  "E-commerce": ["Product Copy Optimizer", "Upsell Suggestion Engine", "Cart Recovery Persona", "Marketplace Listing Writer"],
  "HR & Recruiting": ["Job Description Builder", "Candidate Screening Assistant", "Interview Question Designer", "Offer Communication Writer"],
  "Customer Support": ["Support Response Generator", "Escalation Routing Prompt", "Knowledge Base Draft Writer", "Case Resolution Coach"],
  Sales: ["Cold Outreach Generator", "Objection Handling Coach", "Sales Call Planner", "Pipeline Follow-up Writer"],
  "Project Management": ["Task Breakdown Generator", "Risk Register Builder", "Sprint Retrospective Prompt", "Stakeholder Update Composer"],
  Research: ["Market Scan Analyst", "Competitive Intelligence Prompt", "Trend Synthesis Planner", "Research Summary Builder"],
  Finance: ["Budget Forecast Planner", "Investment Brief Generator", "Expense Optimization Assistant", "Cash Flow Scenario Modeler"],
  Legal: ["Contract Risk Review Prompt", "Clause Comparison Analyst", "Compliance Brief Builder", "Policy Summary Generator"],
  Healthcare: ["Patient Education Draft", "Care Workflow Optimizer", "Clinical Summary Assistant", "Health Content Reviewer"],
  Travel: ["Trip Planner Generator", "Travel Itinerary Builder", "Local Guide Prompt", "Budget-Friendly Travel Optimizer"],
  Lifestyle: ["Habit Builder Coach", "Home Setup Planner", "Wellness Routine Designer", "Personal Life System Organizer"],
  "Personal Development": ["Goal Growth Planner", "Skill Upgrade Framework", "Reflection Prompt Builder", "Career Direction Clarifier"],
  "Data Analysis": ["Insight Dashboard Brief", "Report Summary Generator", "A/B Test Analyst", "Metric Storyteller"],
  "AI Strategy": ["AI Adoption Roadmap Builder", "Use Case Prioritizer", "Prompt Governance Architect", "AI ROI Evaluator"],
  "Creative Writing": ["Story Outline Generator", "Character Development Prompt", "Scene Rewrite Partner", "Narrative Hook Architect"],
  "Video Production": ["Scripting Assistant", "Shot List Builder", "Thumbnail Copy Generator", "Editing Workflow Planner"],
} as const;

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function getDifficulty(index: number): PromptRecord["difficulty"] {
  if (index % 3 === 0) return "Advanced";
  if (index % 2 === 0) return "Intermediate";
  return "Beginner";
}

function buildPrompt(category: string, template: string, index: number): PromptRecord {
  const baseSlug = toSlug(`${category} ${template}`);
  const tags = [category.toLowerCase(), template.toLowerCase().replace(/\s+/g, "-")];
  const toolList = toolSets[index % toolSets.length];
  const promptContent = `Act as a senior ${category.toLowerCase()} strategist. Create a practical output for ${template.toLowerCase()} using the following inputs: [audience], [goal], [context], and [constraints]. Include a clear objective, a prioritized action plan, expected outcomes, and a concise summary. Keep tone precise, actionable, and useful for real-world execution.`;

  return {
    id: `prompt-${String(index + 1).padStart(3, "0")}`,
    slug: `${baseSlug}-${index + 1}`,
    title: `${category}: ${template}`,
    description: `A high-performing ${category.toLowerCase()} prompt that turns ${template.toLowerCase()} into a structured, practical workflow you can use immediately.`,
    category,
    subcategory: ["Strategy", "Operations", "Content", "Analysis", "Execution"][index % 5],
    tags,
    compatibleTools: toolList,
    difficulty: getDifficulty(index),
    promptContent,
    customizableVars: ["audience", "goal", "context", "constraints"],
    instructions: `Replace the variables with your own details, then refine the output for your brand, audience, and constraints before using it in production.`,
    exampleInput: `Audience: ${category} team\nGoal: improve output quality\nContext: working with limited time\nConstraints: small budget and weekly review cycle`,
    exampleOutput: `Objective: Create a repeatable process that improves efficiency while keeping quality high.\nAction Plan: ...`,
    tips: `Use this prompt to speed up repetitive work, clarify scope, and keep deliverables aligned with business goals.`,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    imageAlt: `${category} workflow planning board`,
    seoTitle: `${template} for ${category}`,
    metaDescription: `Use this ${category.toLowerCase()} prompt template to create more strategic, actionable, and repeatable results in less time.`,
    copyCount: 110 + index * 7,
    viewCount: 500 + index * 19,
    published: true,
    createdAt: new Date(2025, 0, 12 + index).toISOString(),
    updatedAt: new Date(2025, 4, 7 + (index % 18)).toISOString(),
  };
}

export const promptCatalog: PromptRecord[] = categories.flatMap((category, categoryIndex) =>
  categoryTemplates[category].flatMap((template, templateIndex) =>
    Array.from({ length: 10 }, (_, round) => {
      const index = categoryIndex * 40 + templateIndex * 10 + round;
      const titleSuffix = ["Framework", "Playbook", "System", "Blueprint", "Sprint", "Checklist", "Guide", "Matrix", "Generator", "Workshop"][round];
      const prompt = buildPrompt(category, `${template} ${titleSuffix}`, index);
      return {
        ...prompt,
        title: `${category}: ${template} ${titleSuffix}`,
        slug: `${toSlug(`${category} ${template} ${titleSuffix}`)}-${index + 1}`,
        seoTitle: `${template} ${titleSuffix} for ${category}`,
      };
    }),
  ),
);

export const promptCount = promptCatalog.length;
export const trendingPrompts = [...promptCatalog].sort((a, b) => b.viewCount - a.viewCount).slice(0, 4);
export const recentlyAdded = [...promptCatalog].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
export const featuredPrompts = trendingPrompts.slice(0, 4);
export const mostCopiedPrompts = [...promptCatalog].sort((a, b) => b.copyCount - a.copyCount).slice(0, 4);
