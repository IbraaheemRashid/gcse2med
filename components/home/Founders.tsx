import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { founders } from "@/content/founders";

/**
 * Compact founder strip. The full bios live on /about; this is the trust signal
 * on the homepage, which matters most while there are no reviews yet.
 *
 * Renders nothing until `content/founders.ts` has entries — see that file for
 * why it ships empty.
 */
export function Founders() {
  if (founders.length === 0) return null;

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Who we are"
          title="Taught by the people who built it"
          lead="We are not a marketplace matching you with whoever is free. You are taught by us."
          align="center"
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {founders.map((founder) => (
            <li
              key={founder.id}
              className="flex flex-col items-center rounded-card border border-ink-200 bg-white p-7 text-center shadow-card"
            >
              {founder.photo ? (
                <div className="h-24 w-24 overflow-hidden rounded-full ring-1 ring-ink-200">
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role} at GCSE2MED`}
                    width={192}
                    height={192}
                    sizes="6rem"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <h3 className={`text-xl font-bold ${founder.photo ? "mt-5" : ""}`}>
                {founder.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-700">
                {founder.role}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                {founder.strapline}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-ink-600">
          <Link
            href="/about#founders"
            className="font-semibold text-brand-700 underline underline-offset-4"
          >
            Read why we started GCSE2MED
          </Link>
        </p>
      </Container>
    </Section>
  );
}
