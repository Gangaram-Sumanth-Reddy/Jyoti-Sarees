import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { InstagramReels } from "@/components/home/InstagramReels";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Testimonials } from "@/components/home/Testimonials";

export default function Page() {
  return (
    <>
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
