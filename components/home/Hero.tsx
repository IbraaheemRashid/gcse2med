import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/site/BookButton";
export function Hero() {
 return <section className="bg-white pb-8"><Container>
  <div className="py-8 sm:py-12">
   <p className="text-sm font-semibold text-brand-700">GCSE · Maths &amp; Sciences</p>
   <h1 className="mt-4 max-w-5xl text-[clamp(2.1rem,5.8vw,4.5rem)] font-bold leading-[1.07] tracking-tight text-brand-950">The support that<br/><span className="text-brand-600">understands <span className="decoration-accent-400 underline decoration-4 underline-offset-8">YOUR</span> child</span></h1>
   <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Maths","Biology","Chemistry","Physics"].map((name,i)=><Link key={name} href={`/subjects-pricing#subject-${name.toLowerCase()}`} className="flex items-center justify-between gap-2 rounded-2xl bg-brand-50 p-4 font-bold text-brand-700 sm:p-5"><span>{name}</span><span aria-hidden="true" className="rounded-xl bg-white px-3 py-2">{["π","⌘","⚗","⚛"][i]}</span></Link>)}</div>
  </div>
  <div className="grid items-center gap-8 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-12">
   <div><p className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-semibold">Small groups. Personal support.</p>
   <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">Find the gaps.<br/>Build understanding.<br/><span className="text-accent-300">Walk into the next exam knowing what to do.</span></h2>
   <p className="mt-6">Tuition from <strong className="text-2xl">£59 per month</strong> for one subject.</p>
   <div className="mt-5 flex flex-col gap-3"><ButtonLink href="/assessment" variant="accent" size="lg">Take the free assessment →</ButtonLink><BookButton source="hero" variant="inverse" size="lg">Book a free consultation</BookButton></div>
   <p className="mt-4 text-xs text-white/90">No account needed for the assessment. No obligation to enrol.</p></div>
   <Image src="/images/hero-lesson.webp" alt="A student following an online biology lesson at home" width={1536} height={1024} priority sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[3/2] w-full rounded-3xl object-cover lg:aspect-[4/5]"/>
  </div>
  <ul className="grid gap-4 py-7 text-sm font-medium text-brand-950 sm:grid-cols-3">{["A one-hour lesson every week","Revision resources between lessons","No more than 8 in an Essential group"].map(x=><li key={x} className="flex items-center gap-3"><span aria-hidden="true" className="rounded-full bg-accent-300 px-2 py-1">✓</span>{x}</li>)}</ul>
 </Container></section>;
}
