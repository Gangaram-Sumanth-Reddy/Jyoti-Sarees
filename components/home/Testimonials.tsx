import Image from "next/image";
import { DropTestimonial } from "@/components/home/DropTestimonial";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { copy } from "@/lib/site";
import { testimonials, type Testimonial } from "@/lib/testimonials";

function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={index < rating ? "text-[#f5b301]" : "text-border-strong"}
        >
          <path
            fill="currentColor"
            d="M10 1.6l2.47 5.02 5.53.8-4 3.9.94 5.5L10 14.23l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z"
          />
        </svg>
      ))}
    </div>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0 28V17.2C0 7.6 5.3 1.9 14.1 0l1.6 3.7C10.4 5.3 7.9 8.6 7.6 13.4H14V28H0zm20.3 0V17.2C20.3 7.6 25.6 1.9 34.4 0L36 3.7c-5.3 1.6-7.8 4.9-8.1 9.7h6.4V28h-14z"
      />
    </svg>
  );
}

function Attribution({
  testimonial,
  className,
  metaClassName,
}: {
  testimonial: Testimonial;
  className?: string;
  metaClassName?: string;
}) {
  return (
    <>
      <p className={cn("text-body font-semibold text-navy", className)}>
        {testimonial.name}
      </p>
      <p className={cn("mt-0.5 text-small text-muted", metaClassName)}>
        {testimonial.city} · {testimonial.saree}
      </p>
    </>
  );
}

function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-soft sm:col-span-2 sm:flex-row lg:col-span-1 lg:row-span-2 lg:min-h-[34rem] lg:flex-col lg:justify-end lg:border-0">
      <div className="relative aspect-square w-full shrink-0 bg-cream sm:aspect-auto sm:min-h-[20rem] sm:w-2/5 lg:absolute lg:inset-0 lg:w-full">
        <Image
          src={testimonial.image}
          alt={`${testimonial.name} wearing her ${testimonial.saree} saree`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover object-[50%_15%]"
        />
      </div>
      <div className="relative flex flex-1 flex-col p-6 lg:flex-none lg:bg-linear-to-t lg:from-navy-deep/95 lg:via-navy-deep/80 lg:to-transparent lg:pt-28">
        <StarRating rating={testimonial.rating} />
        <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-rich-black lg:text-white">
          “{testimonial.quote}”
        </blockquote>
        <figcaption className="mt-5 border-t border-border pt-4 lg:border-white/20">
          <Attribution
            testimonial={testimonial}
            className="lg:text-white"
            metaClassName="lg:text-white/75"
          />
        </figcaption>
      </div>
    </figure>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex flex-col rounded-lg border border-border bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-card">
      <QuoteMark className="absolute right-6 top-6 text-navy/10" />
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-4 flex-1 text-body leading-relaxed text-rich-black">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Image
          src={testimonial.image}
          alt=""
          width={48}
          height={48}
          sizes="48px"
          className="size-12 shrink-0 rounded-full object-cover ring-2 ring-cream"
        />
        <div className="min-w-0">
          <Attribution testimonial={testimonial} />
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const featured = testimonials.find((item) => item.featured) ?? testimonials[0];
  const others = testimonials.filter((item) => item.id !== featured.id);
  const average =
    testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title={copy.testimonials.title}
          description={copy.testimonials.description}
          align="center"
          className="max-w-2xl"
        >
          <div className="mt-2 inline-flex items-center gap-2.5 rounded-pill border border-border bg-white px-4 py-2 shadow-soft">
            <StarRating rating={Math.round(average)} />
            <span className="text-small font-semibold text-navy">
              {average.toFixed(1)} out of 5
            </span>
          </div>
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <FeaturedTestimonial testimonial={featured} />
          {others.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <DropTestimonial />
      </Container>
    </Section>
  );
}
