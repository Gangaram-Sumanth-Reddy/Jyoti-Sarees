import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Hero } from "@/components/home/Hero";
import { InstagramReels } from "@/components/home/InstagramReels";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, seoConfig } from "@/lib/seo";
import {
  localBusinessSchemas,
  organizationSchema,
  websiteSchema,
} from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: seoConfig.defaultTitle,
  absoluteTitle: true,
  description: seoConfig.defaultDescription,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), ...localBusinessSchemas()]}
      />
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <AboutTeaser />
      <Testimonials />
      <InstagramReels />
    </>
  );
}
