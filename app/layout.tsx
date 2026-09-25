import type { Metadata } from "next";
import { EnquiryCartHost } from "@/components/cart/EnquiryCartHost";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-white font-sans text-rich-black antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex min-w-0 flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <EnquiryCartHost />
      </body>
    </html>
  );
}
