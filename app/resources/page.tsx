import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { resourceSubjects } from "@/content/resource-subjects";
export const metadata: Metadata = { title: "Resources", description: "Choose your GCSE subject for flashcards, question practice, checklists and lesson slides. Track your past papers in one place.", alternates: { canonical: "/resources" } };
export default function ResourcesPage() {
  return <>
    <PageHeader eyebrow="Free GCSE resources" title="Your next revision session starts here" lead="Choose a subject to find its revision tools and downloads, or keep track of your past papers below." />
    <Section className="bg-white"><Container>
      <div className="rounded-3xl bg-brand-700 p-6 text-white sm:p-10">
        <p className="text-sm font-semibold text-accent-300">See your progress</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Past paper tracker</h2>
        <p className="mt-4 max-w-2xl leading-relaxed">Log your papers, follow your scores and see which topics need another look. Start with the example papers or clear them to add your own.</p>
        <ButtonLink href="/resources/past-paper-tracker" variant="accent" className="mt-6">Open past paper tracker →</ButtonLink>
        <p className="mt-4 text-sm text-white/85">Progress saves in this browser. Use the backup and sharing tools to keep a copy or share it with your tutor.</p>
      </div>
      <div className="mt-12"><SectionHeading title="Choose your subject" lead="Everything available for your subject, in one place." /></div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{resourceSubjects.map(subject => <Link key={subject.id} href={`/resources/${subject.id}`} className="rounded-2xl border border-brand-200 bg-brand-50 p-6 transition hover:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"><h2 className="text-2xl font-bold text-brand-950">{subject.name} <span aria-hidden="true">↗</span></h2><p className="mt-3 text-ink-600">{subject.id === "maths" ? "Build question sheets and practise the topics you need." : "Flashcards, specification checklist, summary sheet and lesson slides."}</p><p className="mt-5 font-semibold text-brand-700">Explore {subject.name.toLowerCase()} resources →</p></Link>)}</div>
    </Container></Section>
  </>;
}
