import type { CSSProperties } from "react";
import { SocialIcon } from "@/components/layout/SocialIcons";
import { ReelCard } from "@/components/home/ReelCard";
import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reels } from "@/lib/reels";
import { copy, site } from "@/lib/site";

const cardClassName =
  "reels-card w-[calc((100cqw-0.75rem)/1.4)] shrink-0 pr-3 sm:w-[calc(100cqw/3)] sm:pr-4 lg:w-[calc(100cqw/4)] lg:pr-5";

export function InstagramReels() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title={copy.instagram.title}
          description={copy.instagram.description}
          align="center"
          className="max-w-2xl"
        />

        <div className="reels-marquee @container overflow-hidden">
          <ul
            className="reels-track flex w-max list-none p-0"
            style={{ "--reels-duration": `${reels.length * 7}s` } as CSSProperties}
          >
            {reels.map((reel) => (
              <li key={reel.id} className={cardClassName}>
                <ReelCard reel={reel} />
              </li>
            ))}
            {reels.map((reel) => (
              <li key={`${reel.id}-loop`} className={`${cardClassName} reels-loop-copy`} aria-hidden="true">
                <ReelCard reel={reel} decorative />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <ExternalButtonLink href={site.instagramUrl}>
            <SocialIcon id="instagram" />
            Follow Us on Instagram
          </ExternalButtonLink>
        </div>
      </Container>
    </Section>
  );
}
