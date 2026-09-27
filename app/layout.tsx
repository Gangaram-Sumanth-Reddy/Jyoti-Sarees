import type { Metadata, Viewport } from "next";
import { EnquiryCartHost } from "@/components/cart/EnquiryCartHost";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RouteScrollReset } from "@/components/layout/RouteScrollReset";
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

export const viewport: Viewport = {
  themeColor: "#0a2472",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-white font-sans text-rich-black antialiased max-md:pb-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom))]">
        <RouteScrollReset />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex min-w-0 flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
        <MobileBottomNav />
        <EnquiryCartHost />
      </body>
    </html>
  );
}
