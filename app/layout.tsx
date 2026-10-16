import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { RouteScrollReset } from "@/components/layout/RouteScrollReset";
import { PagePreCta } from "@/components/layout/PagePreCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SplashScreen, splashBootScript } from "@/components/layout/SplashScreen";
import { themeBootScript } from "@/components/layout/ThemeToggle";
import { GTM_ID } from "@/lib/gtm";
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
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
      </head>
      {/* Official Next.js GTM loader (@next/third-parties) — injects the container script. */}
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="flex min-h-full flex-col bg-page font-sans text-rich-black antialiased max-md:pb-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom))]">
        {/* GTM noscript fallback for browsers with JavaScript disabled. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <SplashScreen />
        <RouteScrollReset />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex min-w-0 flex-1 flex-col">
          {children}
        </main>
        <PagePreCta />
        <SiteFooter />
        <FloatingWhatsApp />
        <MobileBottomNav />
      </body>
    </html>
  );
}
