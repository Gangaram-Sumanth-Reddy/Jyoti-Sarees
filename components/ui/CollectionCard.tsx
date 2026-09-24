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
      className={cn("flex flex-col overflow-hidden p-0 shadow-soft", className)}
    >
      <Link href={href} className="group block min-w-0">
        <ImageFrame aspect="card" radius="none" className="rounded-t-md">
          <ImagePlaceholder label={name} />
        </ImageFrame>
        <div className="flex flex-col justify-center gap-1.5 px-4 py-3.5 sm:px-5 sm:py-4">
          <h3 className="text-h3 leading-snug transition-colors group-hover:text-accent">
            {name}
          </h3>
          <p className="text-small leading-snug text-muted">{description}</p>
        </div>
      </Link>
    </Card>
  );
}
