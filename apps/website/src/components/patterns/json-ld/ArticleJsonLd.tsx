import { JsonLd } from "@/components/primitives/JsonLd";

export type ArticleJsonLdProps = {
  headline: string;
  description: string;
  imageUrl: string;
  authorName: string;
  publisherOrgName: string;
  publisherLogoUrl: string;
  datePublished: Date | string;
  articleSection: string;
};

/**
 * Article JSON-LD component
 *
 * Returns a JSON-LD structured data object for an article for SEO purposes
 *
 * @see {@link https://sanity-plugin-seofields.thehardik.in/docs/schema-org/article|Article Schema - sanity-plugin-seofields}}
 */
export function ArticleJsonLd({
  headline,
  description,
  imageUrl,
  authorName,
  publisherOrgName,
  publisherLogoUrl,
  datePublished,
  articleSection,
}: ArticleJsonLdProps) {
  const formattedDate = new Date(datePublished).toISOString().split("T")[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: imageUrl,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: publisherOrgName,
      logo: { "@type": "ImageObject", url: publisherLogoUrl },
    },
    datePublished: formattedDate,
    articleSection: articleSection,
  };
  return <JsonLd structuredData={structuredData} />;
}
