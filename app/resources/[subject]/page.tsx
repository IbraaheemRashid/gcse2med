import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { resourceSubjects } from "@/content/resource-subjects";
import { ResourceDownloads } from "@/components/site/ResourceDownloads";
import { Container, Section } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
type Props = { params: Promise<{subject: string}> };
export const dynamicParams = false;
export function generateStaticParams() { return resourceSubjects.map(s => ({subject:s.id})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {subject} = await params;
  const entry = resourceSubjects.find(s => s.id === subject);
  if (!entry) notFound();
  return {title: entry.name + " resources", alternates: {canonical: "/resources/" + subject}};
}
export default async function SubjectResources({params}: Props) {
  const {subject} = await params;
  const entry = resourceSubjects.find(s => s.id === subject);
  if (!entry) notFound();
  const maths = subject === "maths";
  return <>
    <PageHeader eyebrow="GCSE revision" title={entry.name + " resources"} lead={maths ? "Make a question sheet for your next revision session." : "Practise with flashcards, check your knowledge and revisit the lesson."} />
    <Section className="bg-white"><Container>
      <Link href="/resources" className="font-semibold text-brand-700 underline underline-offset-4">← All subjects</Link>
      <div className="mt-7 rounded-3xl bg-brand-700 p-6 text-white sm:p-9">
        <h2 className="text-2xl font-bold text-white">{maths ? "Maths question generator" : entry.name + " flashcards"}</h2>
        <p className="mt-4 max-w-2xl">{maths ? "Choose your topics and build a GCSE Maths question sheet, with answers to check your work." : "Choose your exam board and topics, reveal each answer and review the cards you need to practise."}</p>
        <ButtonLink href={maths ? "/resources/tools/maths-question-generator.html" : "/resources/flashcards/" + subject + ".html"} variant="accent" className="mt-6">{maths ? "Create a question sheet →" : "Open flashcards →"}</ButtonLink>
        <p className="mt-4 text-sm text-white/85">Saved work stays in this browser. Back up anything you want to keep before changing devices or clearing browser data.</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-5"><Link href="/resources/tools/past-paper-tracker.html" className="font-semibold text-brand-700 underline">Open past paper tracker</Link><Link href={"/assessment/" + subject + "/gcse"} className="font-semibold text-brand-700 underline">Take a free assessment</Link></div>
    </Container></Section>
    <ResourceDownloads subject={subject}/>
  </>;
}
