export type JsonLdProps = {
  structuredData: object;
};

/**
 * JSON-LD component
 *
 * Renders a JSON-LD script tag with the provided structured data
 *
 * @Warning Don't use this component directly, use the specific JSON-LD components instead, eg. {@link WebPageJsonLd}
 */
export function JsonLd({ structuredData = {} }: JsonLdProps) {
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
