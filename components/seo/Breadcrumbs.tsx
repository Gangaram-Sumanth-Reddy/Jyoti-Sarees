import Link from "next/link";
import type { Crumb } from "@/lib/product-seo";
import { cn } from "@/lib/cn";

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/** Visible breadcrumb trail; mirrors the BreadcrumbList structured data. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-small">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex min-w-0 items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="truncate font-medium text-muted">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="font-semibold text-navy transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-subtle">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
