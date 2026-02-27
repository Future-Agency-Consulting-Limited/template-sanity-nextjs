import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/queries/pages";
import { PageBuilder } from "@/components/page-builder";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

  return page?.content ? (
    <PageBuilder
      documentId={page._id}
      documentType={page._type}
      content={page.content}
    />
  ) : null;
}
