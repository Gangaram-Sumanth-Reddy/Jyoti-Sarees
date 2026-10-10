import { AboutValues } from "@/components/about/AboutCraftsmanship";
import { AboutHero } from "@/components/about/AboutHero";
import { Testimonials } from "@/components/home/Testimonials";
import { aboutContent } from "@/lib/about";
import { buildMetadata, seoImages, snippet } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Woman Behind Jyoti Sarees",
  description: snippet(aboutContent.hero.description),
  path: "/about",
  image: seoImages.about,
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutValues />
      <Testimonials uniform />
    </>
  );
}
