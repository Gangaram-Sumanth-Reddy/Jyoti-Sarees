import { AboutCraftsmanship } from "@/components/about/AboutCraftsmanship";
import { AboutFinalCta } from "@/components/about/AboutFinalCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { aboutContent } from "@/lib/about";
import { buildMetadata, seoImages, snippet } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Jyoti Sarees — Our Story & Saree Curation",
  description: snippet(aboutContent.hero.description),
  path: "/about",
  image: seoImages.about,
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutCraftsmanship />
      <AboutFinalCta />
    </>
  );
}
