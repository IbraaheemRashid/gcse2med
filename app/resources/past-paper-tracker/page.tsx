import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { PastPaperTracker } from "@/components/resources/tracker/PastPaperTracker";
export const metadata: Metadata = {title:"Past paper tracker",description:"Log GCSE past papers, track your scores and plan what to revise next.",alternates:{canonical:"/resources/past-paper-tracker"}};
export default function TrackerPage() {
  return <><PageHeader eyebrow="Your revision toolkit" title="Past paper tracker" lead="See how far you’ve come. Log your papers, find the topics costing you marks and turn your next revision session into a clear plan."><ButtonLink href="/resources" variant="secondary">← All resources</ButtonLink></PageHeader><PastPaperTracker/></>;
}
