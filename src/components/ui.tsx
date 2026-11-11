import { clsx } from "clsx";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-500">{eyebrow}</span>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base text-slate-600">{description}</p> : null}
    </div>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700", className)}>
      {children}
    </span>
  );
}
