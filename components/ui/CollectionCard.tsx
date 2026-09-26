import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";

type CollectionCardProps = {
  name: string;
  description: string;
  href: string;
  className?: string;
};

export function CollectionCard({
  name,
  description,
  href,
  className,
}: CollectionCardProps) {
  return (
    <Card
      as="li"
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden p-0 shadow-soft",
        className,
      )}
    >
      <Link href={href} className="group flex h-full min-w-0 flex-col">
        <ImageFrame
          aspect="card"
          radius="none"
          className="shrink-0 rounded-t-md"
        >
          <ImagePlaceholder label={name} />
        </ImageFrame>
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-3.5 py-4 text-center sm:px-4 sm:py-4">
          <h3 className="min-h-[1.6em] text-balance text-[1.05rem] font-semibold leading-snug text-rich-black transition-colors group-hover:text-accent sm:text-h3">
            {name}
          </h3>
          <p className="line-clamp-2 min-h-[2.5em] text-small leading-snug text-muted">
            {description}
          </p>
        </div>
      </Link>
    </Card>
  );
}
