import { NextResponse } from "next/server";
import { listPrompts } from "@/lib/db";

export async function GET() {
  const prompts = (await listPrompts(20)).filter((prompt) => prompt.published);

  return NextResponse.json({
    count: prompts.length,
    items: prompts.map((prompt) => ({
      id: prompt.id,
      slug: prompt.slug,
      title: prompt.title,
      category: prompt.category,
      description: prompt.description,
      difficulty: prompt.difficulty,
      copyCount: prompt.copy_count,
      viewCount: prompt.view_count,
      compatibleTools: Array.isArray(prompt.compatibleTools) ? prompt.compatibleTools : [],
    })),
  });
}
