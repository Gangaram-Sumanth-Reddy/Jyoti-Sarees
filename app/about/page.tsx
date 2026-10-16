import { AboutValues } from "@/components/about/AboutCraftsmanship";
import { AboutHero } from "@/components/about/AboutHero";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutContent } from "@/lib/about";
import { buildMetadata, seoImages, snippet } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "The Woman Behind Jyoti Sarees",
  description: snippet(aboutContent.hero.description),
  path: "/about",
  image: seoImages.about,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ]}
      />
      <AboutHero />
      <AboutValues />
      <Testimonials uniform />
    </>
  );
}
