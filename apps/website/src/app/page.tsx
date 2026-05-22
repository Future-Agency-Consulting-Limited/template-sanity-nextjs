import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOME_PAGE_METADATA_QUERY,
  HOME_PAGE_QUERY,
} from "@/sanity/queries/pages";
import { Metadata } from "next";
import { env } from "@/env/client";
import { WebPageJsonLd } from "@/components/patterns/json-ld/WebPageJsonLd";
import { getSiteSettings } from "@/sanity/lib/siteSettings";

export const revalidate = false; // Indefinitely cache this page

/**
 * Generate metadata for the homepage route
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: HOME_PAGE_METADATA_QUERY,
    // Metadata should never contain stega
    stega: false,
  });

  const metadata: Metadata = {
    title: data?.homePage?.metaTitle || "",
    description: data?.homePage?.metaDescription || "",
    robots: {
      index: !data?.homePage?.noIndex,
      follow: !data?.homePage?.noFollow,
    },
  };

  return metadata;
}

export default async function Page() {
  const siteSettings = await getSiteSettings();
  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  return page?.homePage?.content ? (
    <>
      <WebPageJsonLd
        name={page?.homePage?.metaTitle}
        url={`${env.NEXT_PUBLIC_SITE_URL}/${page?.homePage.slug.current}`}
        description={page?.homePage?.metaDescription ?? ""}
        inLanguage="en"
        publisherOrgName={siteSettings?.siteName ?? ""}
        // todo uncomment once you've added image component from dodl
        publisherLogoUrl={/*siteSettings?.logo?.src ??*/ ""}
      />
      <PageBuilder
        documentId={page?.homePage._id}
        documentType={page?.homePage._type}
        content={page?.homePage.content}
      />
    </>
  ) : null;
}
