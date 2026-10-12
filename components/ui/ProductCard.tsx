import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";
import { productHref, type Product } from "@/lib/products";
import { PriceOffer } from "@/components/ui/PriceOffer";

type ProductCardProps = {
  product?: Product;
  name?: string;
  category?: string;
  fabric?: string;
  colour?: string;
  price?: string;
  href?: string;
  className?: string;
  badge?: string;
  available?: boolean;
};

export function ProductCard({
  product,
  name: nameProp,
  category: categoryProp,
  fabric: fabricProp,
  colour: colourProp,
  price: priceProp,
  href: hrefProp,
  className,
  badge,
  available: availableProp,
}: ProductCardProps) {
  const name = product?.name ?? nameProp ?? "";
  const category = product?.category ?? categoryProp ?? "";
  const fabric = product?.fabric ?? fabricProp;
  const colour = product?.colour ?? colourProp;
  const price = product?.priceLabel ?? priceProp ?? "";
  const href = hrefProp ?? (product ? productHref(product) : "#");
  const photo = product?.gallery.find((item) => item.src)?.src;
  const available = product?.available ?? availableProp ?? true;
  const meta = [category, fabric].filter(Boolean).join(" · ");
  const sellingPrice = product?.sellingPrice ?? product?.price;

  return (
    <Card
      as="li"
      className={cn(
        "!flex h-full min-w-0 !flex-col overflow-hidden !rounded-xl !border-[#e6e6e6] !bg-white !p-2 !shadow-[0_1px_4px_rgba(15,17,17,0.12)] sm:!p-2.5",
        className,
      )}
    >
      <Link href={href} className="group flex min-w-0 flex-1 flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#f7f5f2]">
          {photo ? (
            <Image
              src={photo}
              alt={`${name}${colour ? ` in ${colour}` : ""} saree`}
              fill
              sizes="(max-width: 639px) 46vw, (max-width: 1023px) 31vw, 22vw"
              className="object-contain"
            />
          ) : (
            <ImagePlaceholder label={name} />
          )}
          {badge ? (
            <Badge variant="inverse" className="absolute left-2 top-2 z-10 shadow-soft">
              {badge}
            </Badge>
          ) : null}
          {!available ? (
            <span className="absolute bottom-2 left-2 rounded-pill bg-navy/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white">
              Out of stock
            </span>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-1 pb-1 pt-2.5">
          {meta ? (
            <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-accent">
              {meta}
            </p>
          ) : null}
          <h3 className="mt-0.5 truncate text-[0.92rem] font-medium leading-snug text-rich-black group-hover:text-accent">
            {name}
          </h3>
          <PriceOffer
            className="mt-1"
            sellingPrice={sellingPrice}
            originalPrice={product?.originalPrice}
            sellingLabel={price}
          />
        </div>
      </Link>
    </Card>
  );
}
