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
      <Link href={href} className="group flex min-w-0 flex-1 flex-col">
        <ImageFrame aspect="portrait" radius="none" className="rounded-t-md">
          <ImagePlaceholder label={name} />
        </ImageFrame>
        <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
          <h3 className="text-h3 transition-colors group-hover:text-accent">
            {name}
          </h3>
          <p className="text-small text-muted">{description}</p>
        </div>
      </Link>
    </Card>
  );
}
