import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /cart and /privacy-requests stay crawlable so their noindex tag is seen.
      disallow: ["/api/", "/admin/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
