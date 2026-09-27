import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0a2472",
    lang: seoConfig.language,
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/assets/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
