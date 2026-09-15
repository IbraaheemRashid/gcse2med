import type { Metadata } from "next";
import { FounderClass } from "@/components/home/FounderClass";
import { Hero } from "@/components/home/Hero";
import { Reviews } from "@/components/home/Reviews";
import { Methodology } from "@/components/home/Methodology";
import { IntroVideo } from "@/components/home/IntroVideo";
import { TierSummary } from "@/components/home/TierSummary";
import { AssessmentCallout } from "@/components/home/AssessmentCallout";
import { Delivery } from "@/components/home/Delivery";
import { MistakeBank } from "@/components/home/MistakeBank";
import { Founders } from "@/components/home/Founders";
import { HomeFaqs } from "@/components/home/HomeFaqs";
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
      <Reviews />
      <Methodology />
      <IntroVideo />
      <TierSummary />
      <FounderClass />
      <AssessmentCallout />
      <Delivery />
      <MistakeBank />
      <Founders />
      <HomeFaqs />
      <FinalCta />
    </>
  );
}
