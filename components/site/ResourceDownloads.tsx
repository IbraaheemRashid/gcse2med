import Link from "next/link";
import { downloads } from "@/content/downloads";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
export function ResourceDownloads({ subject }: { subject: string }) {
  const items = downloads.filter(item => item.subject === subject);
  return <Section className="bg-brand-50" id="downloads"><Container>
    {items.length > 0 && <SectionHeading title="Download and revise" lead="Keep these checklists, summary sheets and lesson slides for your revision." />}
    {["Checklists", "Summary sheets", "Lesson slides"].map(category => {
      const group = items.filter(item => item.category === category);
      return group.length > 0 && <div key={category} className="mt-8"><h3 className="text-2xl font-bold">{category}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.map(item => <a key={item.href} href={item.href} download className="flex flex-col rounded-2xl border border-brand-100 bg-white p-5 hover:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"><span className="text-lg font-bold">{item.title}</span><span className="mt-2 grow text-sm text-ink-600">{item.detail}</span><span className="mt-5 text-sm font-semibold text-brand-700">Download PDF ↓</span></a>)}</div></div>;
    })}
    <div className="mt-8 rounded-2xl border border-dashed border-brand-200 p-6"><h3 className="text-xl font-bold">End-of-topic tests</h3><p className="mt-2 text-ink-600">Coming soon. In the meantime, <Link href={`/assessment/${subject}/gcse`} className="font-semibold text-brand-700 underline">try a free subject assessment</Link> to find your next revision focus.</p></div>
  </Container></Section>;
}
