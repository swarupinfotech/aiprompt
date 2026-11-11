"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("Message sent successfully. Our team will get back to you soon.");
      event.currentTarget.reset();
    } else {
      setStatus("There was a problem sending your message. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input name="name" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Subject
        <input name="subject" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Message
        <textarea name="message" required rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-violet-300" />
      </label>

      <button type="submit" className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500">Send message</button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
