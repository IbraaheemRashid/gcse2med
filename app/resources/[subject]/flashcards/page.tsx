import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Layout";
import { StudyTool } from "@/components/resources/StudyTool";
const subjects=["biology","chemistry","physics"];
type Props={params:Promise<{subject:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return subjects.map(subject=>({subject}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {subject}=await params; if(!subjects.includes(subject))notFound();return {title:subject[0].toUpperCase()+subject.slice(1)+" flashcards",alternates:{canonical:"/resources/"+subject+"/flashcards"}};}
export default async function Flashcards({params}:Props){const {subject}=await params;if(!subjects.includes(subject))notFound();const name=subject[0].toUpperCase()+subject.slice(1);return <><PageHeader eyebrow="GCSE revision" title={name+" flashcards"} lead="Choose your course, practise a topic and build confidence one card at a time."/><Container className="py-8 sm:py-12"><Link href={"/resources/"+subject} className="mb-8 inline-block font-semibold text-brand-700 underline underline-offset-4">← {name} resources</Link><StudyTool id={subject+"-flashcards"}/></Container></>;}
