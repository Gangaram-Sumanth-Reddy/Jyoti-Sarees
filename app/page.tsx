import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Testimonials } from "@/components/home/Testimonials";

export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <AboutTeaser />
      <Craftsmanship />
      <Testimonials />
      <InstagramGallery />
      <FinalCta />
    </>
  );
}
