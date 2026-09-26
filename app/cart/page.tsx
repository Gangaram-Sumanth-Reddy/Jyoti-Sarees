import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Enquiry Cart",
  description:
    "Review your saree enquiry list and send it on WhatsApp. No online payment.",
};

export default function CartPage() {
  return <CartPageContent />;
}
