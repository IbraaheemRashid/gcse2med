import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Layout";
import { StudyTool } from "@/components/resources/StudyTool";
export const metadata:Metadata={title:"Maths question generator",alternates:{canonical:"/resources/maths/question-generator"}};
export default function QuestionGenerator(){return <><PageHeader eyebrow="GCSE revision" title="Maths question generator" lead="Build a question sheet for the topics you want to practise, with worked answers to check your progress."/><Container className="py-8 sm:py-12"><Link href="/resources/maths" className="mb-8 inline-block font-semibold text-brand-700 underline underline-offset-4">← Maths resources</Link><StudyTool id="maths-generator"/></Container></>;}
