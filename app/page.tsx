import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Reviews } from "@/components/home/Reviews";
import { Methodology } from "@/components/home/Methodology";
import { IntroVideo } from "@/components/home/IntroVideo";
import { TierSummary } from "@/components/home/TierSummary";
import { AssessmentCallout } from "@/components/home/AssessmentCallout";
import { Delivery } from "@/components/home/Delivery";
import { MistakeBank } from "@/components/home/MistakeBank";
import { Founders } from "@/components/home/Founders";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Section order follows the order a parent decides in: proof that other
 * families trust us, then the method, then what it costs. Pricing sits high
 * deliberately — burying it reads as hiding it.
 *
 * Backgrounds alternate white / ink-50 so no two adjacent sections run
 * together. `IntroVideo` and `Founders` render nothing until their content
 * exists, so the alternation is checked with them absent as well as present:
 * both are white and sit between an ink-50 pair, which is what keeps the
 * rhythm intact either way.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Reviews />
      <Methodology />
      <IntroVideo />
      <TierSummary />
      <AssessmentCallout />
      <Delivery />
      <MistakeBank />
      <Founders />
      <FinalCta />
    </>
  );
}
