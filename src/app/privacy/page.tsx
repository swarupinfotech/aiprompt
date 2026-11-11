import { Container } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="max-w-3xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Privacy policy</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">How user data is handled</h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
          <p>We collect basic analytics and contact submissions only when voluntarily provided by users.</p>
          <p>We use collected information to improve platform usability, maintain security, and respond to inquiries.</p>
          <p>We do not sell personal information and do not use private credentials in frontend code.</p>
        </div>
      </Container>
    </main>
  );
}
