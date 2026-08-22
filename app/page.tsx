import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Methodology } from "@/components/home/Methodology";
import { AssessmentCallout } from "@/components/home/AssessmentCallout";
import { Delivery } from "@/components/home/Delivery";
import { TierSummary } from "@/components/home/TierSummary";
import { MistakeBank } from "@/components/home/MistakeBank";
import { Reviews } from "@/components/home/Reviews";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Methodology />
      <AssessmentCallout />
      <Delivery />
      <TierSummary />
      <MistakeBank />
      <Reviews />
      <FinalCta />
    </>
  );
}
