import type { ReactNode } from "react";
import { Container } from "./Layout";

/**
 * Shared shell for the legal pages.
 *
 * The draft notice is deliberately prominent and deliberately hard to remove by
 * accident: these documents are scaffolding written to describe what the site
 * actually does, not reviewed legal advice. They need a solicitor's eyes before
 * launch, and until then visitors should know that.
 */
export function LegalPage({
  title,
  updated,
  intro,
  draftNotice = true,
  children,
}: {
  title: string;
  updated: string;
  intro?: ReactNode;
  draftNotice?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="bg-white">
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-ink-500">Last updated: {updated}</p>

          {draftNotice ? (
            <div className="mt-8 rounded-card border border-accent-300 bg-accent-50 p-5">
              <p className="text-sm font-bold text-accent-900">Draft — not yet reviewed</p>
              <p className="mt-2 text-sm leading-relaxed text-accent-900">
                This document describes how the website currently works, but it has not
                been reviewed by a solicitor and is not final. If anything here matters
                to a decision you are making, please{" "}
                <a href="/contact" className="underline underline-offset-2">
                  ask us
                </a>{" "}
                and we will confirm it directly.
              </p>
            </div>
          ) : null}

          {intro ? (
            <div className="mt-8 text-lg leading-relaxed text-ink-600">{intro}</div>
          ) : null}

          <div className="mt-10 space-y-8">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-ink-600 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
