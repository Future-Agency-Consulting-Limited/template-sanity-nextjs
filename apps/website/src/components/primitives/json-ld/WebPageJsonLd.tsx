import { JsonLd } from "@/components/primitives/json-ld/JsonLd";

export type WebPageJsonLdProps = {
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  publisherOrgName: string;
  publisherLogoUrl: string;
};

/**
 * WebPage JSON-LD component
 *
 * Returns a JSON-LD structured data object for a web page for SEO purposes
 * @see {@link https://sanity-plugin-seofields.thehardik.in/docs/schema-org/web-page| WebPage Schema - sanity-plugin-seofields}
 */
export function WebPageJsonLd({
  name,
  url,
  description = "",
  inLanguage = "en",
  publisherOrgName = "",
  publisherLogoUrl = "",
}: WebPageJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    url: url,
    description: description,
    inLanguage: inLanguage,
    publisher: {
      "@type": "Organization",
      name: publisherOrgName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
      },
    },
  };

  return <JsonLd structuredData={structuredData} />;
}
