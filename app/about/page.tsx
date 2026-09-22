import type { Metadata } from "next";
import { AboutCraftsmanship } from "@/components/about/AboutCraftsmanship";
import { AboutFinalCta } from "@/components/about/AboutFinalCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutStoreExperience } from "@/components/about/AboutStoreExperience";
import { AboutStory } from "@/components/about/AboutStory";
import { aboutContent } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutContent.hero.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <AboutCraftsmanship />
      <AboutStoreExperience />
      <AboutFinalCta />
    </>
  );
}
