import type { Metadata } from "next";
import { FounderClass } from "@/components/home/FounderClass";
import { Hero } from "@/components/home/Hero";
import { Reviews } from "@/components/home/Reviews";
import { Methodology } from "@/components/home/Methodology";
import { IntroVideo } from "@/components/home/IntroVideo";
import { TierSummary } from "@/components/home/TierSummary";
import { HomeFaqs } from "@/components/home/HomeFaqs";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="home-refresh">
      <Hero />
      <Reviews />
      <TierSummary />
      <IntroVideo />
      <Methodology />
      <FounderClass />
      <HomeFaqs />
      <FinalCta />
    </div>
  );
}
