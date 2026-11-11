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
  const parsedPayload = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsedPayload.success) {
    return NextResponse.json({ error: "Please provide valid contact details." }, { status: 400 });
  }

  await createContactMessage(parsedPayload.data);
  return NextResponse.json({ ok: true, message: "Contact message saved.", payload: parsedPayload.data }, { status: 201 });
}
