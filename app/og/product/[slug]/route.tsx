import { ImageResponse } from "next/og";
import { productDescriptor } from "@/lib/product-seo";
import { getColourOption, products } from "@/lib/products";
import { seoConfig } from "@/lib/seo";

/**
 * Share card for products without photography yet. Uses only real catalogue
 * data (name, fabric, colours, price). Replaced by real photos automatically
 * once a product gallery has images.
 */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/product/[slug]">,
) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) return new Response("Not found", { status: 404 });

  const colour = getColourOption(product);
  const descriptor = productDescriptor(product) ?? `${product.fabric} Saree`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5f0e8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 360,
            height: "100%",
            display: "flex",
            background: `linear-gradient(160deg, #ffffff 0%, ${colour.hex} 45%, #1a1a1a 100%)`,
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            color: "#0f172a",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#0a2472",
              fontWeight: 700,
            }}
          >
            {seoConfig.siteName}
          </div>
          <div style={{ marginTop: 28, fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>
            {product.name}
          </div>
          <div style={{ marginTop: 18, fontSize: 34, color: "#475569" }}>{descriptor}</div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 30,
              color: "#0f172a",
            }}
          >
            <span style={{ fontWeight: 700 }}>{product.priceLabel}</span>
            <span style={{ color: "#94a3b8" }}>·</span>
            <span>{product.fabric}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
