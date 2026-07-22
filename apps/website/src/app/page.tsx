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
import {
  HOME_PAGE_METADATA_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
} from "@/sanity/types";
import { parsePageLinks } from "@/sanity/lib/link";

export const revalidate = false; // Indefinitely cache this page

/**
 * Generate metadata for the homepage route
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = (await sanityFetch({
    query: HOME_PAGE_METADATA_QUERY,
    // Metadata should never contain stega
    stega: false,
  })) as { data: HOME_PAGE_METADATA_QUERY_RESULT };

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
  const { data: page } = (await sanityFetch({
    query: HOME_PAGE_QUERY,
  })) as { data: HOME_PAGE_QUERY_RESULT };

  const parsedPage = await parsePageLinks(page);

  return parsedPage?.homePage?.content ? (
    <>
      <WebPageJsonLd
        name={parsedPage?.homePage?.metaTitle}
        url={`${env.NEXT_PUBLIC_SITE_URL}/${parsedPage?.homePage.slug.current}`}
        description={parsedPage?.homePage?.metaDescription ?? ""}
        inLanguage="en"
        publisherOrgName={siteSettings?.siteName ?? ""}
        // todo uncomment once you've added image component from dodl
        publisherLogoUrl={/*siteSettings?.logo?.src ??*/ ""}
      />
      <PageBuilder
        documentId={parsedPage?.homePage._id}
        documentType={parsedPage?.homePage._type}
        content={parsedPage?.homePage.content}
      />
    </>
  ) : null;
}
