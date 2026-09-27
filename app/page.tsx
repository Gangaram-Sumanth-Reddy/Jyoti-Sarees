import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { InstagramReels } from "@/components/home/InstagramReels";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, seoConfig } from "@/lib/seo";
import {
  localBusinessSchema,
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
  const local = localBusinessSchema();

  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), ...(local ? [local] : [])]}
      />
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <AboutTeaser />
      <Testimonials />
      <InstagramReels />
      <FinalCta />
    </>
  );
}
