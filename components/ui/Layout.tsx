import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={`py-16 sm:py-24 ${className}`}>
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className = "",
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  /** "accent" for use on the dark brand-950 sections. Passing a text colour
   *  through className cannot work — Tailwind resolves conflicts by stylesheet
   *  order, not by the order classes appear in the attribute. */
  tone?: "brand" | "accent";
}) {
  const colour = tone === "accent" ? "text-accent-300" : "text-brand-600";
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${colour} ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-ink-600">{lead}</p> : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-ink-200 bg-white p-6 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}
