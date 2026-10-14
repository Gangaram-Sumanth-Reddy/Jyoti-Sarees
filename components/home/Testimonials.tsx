import Image from "next/image";
import { DropTestimonial } from "@/components/home/DropTestimonial";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { copy, site } from "@/lib/site";
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

const houseNotes = [
  {
    title: "Tell us the occasion",
    detail: "A wedding, a puja, the office, or a gift — start with how you will wear it.",
  },
  {
    title: "Name a colour or weave",
    detail: "Ajrakh, Banarasi, Pattu, Kora, Silk, Georgette and Designer sarees are in the current catalogue.",
  },
  {
    title: "We confirm it with you",
    detail: "Add it to your enquiry list. There is no online payment.",
  },
] as const;

function HouseNote() {
  return (
    <aside className="house-note flex flex-col rounded-lg p-1.5 shadow-soft sm:col-span-2 lg:col-span-1 lg:row-span-2">
      <div className="house-note-frame flex h-full flex-col rounded-md px-5 py-6 sm:px-7 sm:py-8">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">From the house</p>
        <h3 className="mt-3 text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.02em]">
          We help you choose the right saree.
        </h3>
        <p className="mt-3 text-body leading-relaxed">
          Share what you need. Our team checks availability and replies on WhatsApp.
        </p>
        <ol className="mt-6 flex flex-1 flex-col gap-4">
          {houseNotes.map((note, index) => (
            <li key={note.title} className="flex gap-3">
              <span className="house-note-mark mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-semibold">
                {index + 1}
              </span>
              <span>
                <span className="block text-body font-semibold">{note.title}</span>
                <span className="house-note-detail mt-0.5 block text-small leading-relaxed">
                  {note.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="house-note-foot mt-8 border-t pt-4 text-small leading-relaxed">
          <a href={site.whatsappUrl} className="font-semibold underline underline-offset-4">
            WhatsApp {site.whatsapp}
          </a>
          <span className="mt-1 block">
            {site.hours.opens}–{site.hours.closes}
          </span>
          <span className="mt-1 block">{site.cities}</span>
        </p>
      </div>
    </aside>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-card">
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
          style={
            testimonial.imagePosition
              ? { objectPosition: testimonial.imagePosition }
              : undefined
          }
        />
        <div className="min-w-0">
          <Attribution testimonial={testimonial} />
        </div>
      </figcaption>
    </figure>
  );
}

const marqueeCardClass =
  "w-[calc(100cqw/1.2)] shrink-0 pr-4 sm:w-[calc(100cqw/2.15)] sm:pr-5 lg:w-[calc(100cqw/3)] lg:pr-6";

function TestimonialRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  return (
    <div className="testimonial-marquee @container overflow-hidden">
      <ul
        className={
          direction === "right"
            ? "testimonial-track-right flex w-max list-none py-2"
            : "testimonial-track-left flex w-max list-none py-2"
        }
      >
        {items.map((testimonial) => (
          <li key={testimonial.id} className={marqueeCardClass}>
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
        {items.map((testimonial) => (
          <li
            key={`${testimonial.id}-loop`}
            className={`${marqueeCardClass} testimonial-loop-copy`}
            aria-hidden="true"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type TestimonialsProps = {
  /** About page: six small cards in two rows that scroll in opposite directions. */
  uniform?: boolean;
};

export function Testimonials({ uniform = false }: TestimonialsProps) {
  const featured = testimonials.find((item) => item.featured) ?? testimonials[0];
  const others = testimonials.filter((item) => item.id !== featured.id);
  const cards = others.filter((item) => item.id !== "harini");
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

        {uniform ? (
          <div className="flex flex-col gap-5 sm:gap-6">
            <TestimonialRow items={testimonials.slice(0, 3)} direction="right" />
            <TestimonialRow items={testimonials.slice(3, 6)} direction="left" />
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <HouseNote />
            {cards.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
        <DropTestimonial />
      </Container>
    </Section>
  );
}
