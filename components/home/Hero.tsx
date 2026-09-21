import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
import { tierById } from "@/content/tiers";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="bg-white">
      <Container>
        <div className="grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-brand-700">GCSE &amp; A-level · Maths &amp; Sciences</p>
            <h1 className="mt-5 text-[clamp(2rem,8vw,2.6rem)] font-bold leading-[1.04] text-brand-950 sm:text-5xl lg:text-[3.3rem]">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">Find the gaps. Build understanding. Walk into the next exam knowing what to do.</p>
            <ul className="mt-6 space-y-3 text-base text-brand-950">
              {["A one-hour lesson every week", `No more than ${tierById.essential.maxGroupSize} students in an Essential group`, "Revision resources to keep learning between lessons"].map((item) => (
                <li key={item} className="flex items-start gap-3"><span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm text-brand-700">✓</span>{item}</li>
              ))}
            </ul>
            <p className="mt-7 text-brand-950">Tuition from <strong className="text-2xl">£59 per month</strong> for one subject.</p>
            <div className="mt-5 flex flex-col items-stretch gap-3 sm:items-start">
              <ButtonLink variant="accent" href="/assessment" size="lg" className="w-full sm:max-w-sm">Take the free assessment <span aria-hidden="true">→</span></ButtonLink>
              <BookButton source="hero-refresh" variant="ghost" size="sm">Or book a free video consultation</BookButton>
            </div>
            <p className="mt-3 text-xs text-ink-500">No account needed for the assessment. No obligation to enrol.</p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/hero-graduation.jpg"
              alt="A graduation cap held up in the air outside a university building"
              width={1800}
              height={1200}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </Container>
      <div className="border-y border-brand-100 bg-brand-50">
        <Container><div className="flex flex-col gap-2 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"><p className="font-medium text-brand-950"><span className="mr-2 inline-block rounded-full bg-accent-300 px-2.5 py-1 text-xs font-bold">Founder Class</span>Five free places per core subject. Selection underway.</p><Link href="#founder-class" className="font-semibold text-brand-700 underline underline-offset-4">Find out more →</Link></div></Container>
      </div>
    </section>
  );
}
