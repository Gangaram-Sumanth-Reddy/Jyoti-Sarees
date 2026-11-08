import { SocialIcon } from "@/components/layout/SocialIcons";
import { ReelCard } from "@/components/home/ReelCard";
import { ReelsCarousel } from "@/components/home/ReelsCarousel";
import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reels } from "@/lib/reels";
import { getReelCover } from "@/lib/server/reel-media";
import { copy, site } from "@/lib/site";

/** About 1.5 cards on phones, 2.5 on tablets and 4 on desktop; the right padding is the gap, so both loop halves match. */
const cardClassName = "w-[calc(100cqw/1.5)] shrink-0 pr-4 @xl:w-[calc(100cqw/2.5)] @4xl:w-[calc(100cqw/4)] @4xl:pr-5";

export function InstagramReels() {
  const items = reels.map((reel, index) => ({
    reel,
    image: getReelCover(reel.id) ?? reel.previewImage,
    label: `Reel ${index + 1} of ${reels.length}`,
  }));

  return (
    <Section>
      <Container>
        <SectionHeading title={copy.instagram.title} align="center" className="max-w-2xl" />

        <ReelsCarousel label="Jyoti Sarees Reels">
          {items.map(({ reel, image, label }) => (
            <li key={reel.id} className={cardClassName}>
              <ReelCard reel={reel} image={image} label={label} />
            </li>
          ))}
          {items.map(({ reel, image, label }) => (
            <li key={`${reel.id}-loop`} className={`${cardClassName} reels-loop-copy`} aria-hidden="true">
              <ReelCard reel={reel} image={image} label={label} decorative />
            </li>
          ))}
        </ReelsCarousel>

        <div className="mt-2 flex justify-center sm:mt-4">
          <ExternalButtonLink href={site.instagramUrl}>
            <SocialIcon id="instagram" />
            Follow on Instagram
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
