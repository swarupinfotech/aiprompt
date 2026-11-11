import { NextResponse } from "next/server";
import { z } from "zod";
import { createContactMessage } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    const payload = contactSchema.parse(await request.json());
    createContactMessage(payload);
    return NextResponse.json({ ok: true, message: "Contact message saved.", payload }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
  }
}
