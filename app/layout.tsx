import type { Metadata, Viewport } from "next";
import { EnquiryCartHost } from "@/components/cart/EnquiryCartHost";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RouteScrollReset } from "@/components/layout/RouteScrollReset";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SplashScreen, splashBootScript } from "@/components/layout/SplashScreen";
import { buildMetadata, seoConfig } from "@/lib/seo";
import "./globals.css";

const defaults = buildMetadata({
  title: seoConfig.defaultTitle,
  absoluteTitle: true,
  description: seoConfig.defaultDescription,
  path: "/",
});

export const metadata: Metadata = {
  ...defaults,
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  applicationName: seoConfig.siteName,
  // Canonical/og:url are set per page so unknown routes never inherit the homepage URL.
  alternates: undefined,
  openGraph: { ...defaults.openGraph, url: undefined },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0a2472",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className="h-full"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-white font-sans text-rich-black antialiased max-md:pb-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom))]">
        <SplashScreen />
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
