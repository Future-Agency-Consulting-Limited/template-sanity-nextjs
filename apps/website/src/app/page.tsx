import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOME_PAGE_METADATA_QUERY,
  HOME_PAGE_QUERY,
} from "@/sanity/queries/pages";
import { Metadata } from "next";

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
  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  return page?.homePage?.content ? (
    <PageBuilder
      documentId={page?.homePage._id}
      documentType={page?.homePage._type}
      content={page?.homePage.content}
    />
  ) : null;
}
