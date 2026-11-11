import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Contact</p>
          <h1 className="mt-4 text-4xl font-black text-slate-900">We’d love to hear from you.</h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Use the form to ask questions about prompt quality, platform updates, partnerships, or editorial feedback.
          </p>
        </div>
        <ContactForm />
      </Container>
    </main>
  );
}
