import type { NextConfig } from "next";
import { isShippingPageEnabled } from "./lib/delivery";
import { products } from "./lib/products";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

/**
 * A product lives under exactly one section. Requests for it under the other
 * section redirect to the canonical URL before rendering (the root loading UI
 * streams responses, so in-page redirects could not set a 308 status).
 */
const crossSectionRedirects = products.flatMap((product) => {
  const [from, to] = product.isNewArrival
    ? ["/sarees", "/new-arrivals"]
    : ["/new-arrivals", "/sarees"];
  return [
    { source: `${from}/${product.slug}`, destination: `${to}/${product.slug}`, permanent: true },
    {
      source: `${from}/${product.slug}/:colour`,
      destination: `${to}/${product.slug}/:colour`,
      permanent: true,
    },
  ];
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/collections", destination: "/sarees", permanent: true },
      { source: "/collections/:slug", destination: "/sarees/:slug", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      ...crossSectionRedirects,
    ];
  },
  rewrites() {
    return {
      // Unconfirmed delivery policy: /shipping resolves to a real 404.
      beforeFiles: isShippingPageEnabled()
        ? []
        : [{ source: "/shipping", destination: "/_shipping-unavailable" }],
    };
  },
  headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
