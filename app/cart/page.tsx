import { CartPageContent } from "@/components/cart/CartPageContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enquiry List",
  description:
    "Review your saree enquiry list and send it on WhatsApp. No online payment.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartPageContent />;
}
