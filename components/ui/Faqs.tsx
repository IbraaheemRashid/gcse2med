import type { Faq } from "@/content/faqs";

/** Uses native <details> so it works with JavaScript disabled and needs no state. */
export function Faqs({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-ink-900 marker:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-2xl leading-none text-brand-600 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-600">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/** FAQPage structured data, so the questions can surface in search results. */
export function FaqJsonLd({ items }: { items: Faq[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
