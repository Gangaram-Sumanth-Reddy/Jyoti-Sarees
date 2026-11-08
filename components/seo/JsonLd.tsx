type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
};

/** Server-rendered JSON-LD. `<` is escaped so content can never close the tag. */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
