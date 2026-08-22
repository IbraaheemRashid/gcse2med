import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Layout";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-ink-200 bg-gradient-to-b from-brand-50 to-white">
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">{title}</h1>
          {lead ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-600 sm:text-xl">{lead}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}
