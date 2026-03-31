import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOME_PAGE_METADATA_QUERY,
  HOME_PAGE_QUERY,
} from "@/sanity/queries/pages";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

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
  };

  return metadata;
}

export default async function Page() {
  const headersList = await headers();
  const geoRegion = headersList.get("x-todl-geo-region") || "Unknown Region";

  const { data: page } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  return page?.homePage?.content ? (
    <>
      <div>
        <h1>Geo Region: {geoRegion}</h1>
        <Link href="/test-page">test-page</Link>
      </div>
      <PageBuilder
        documentId={page?.homePage._id}
        documentType={page?.homePage._type}
        content={page?.homePage.content}
      />
    </>
  ) : null;
}
