import { sanityFetch } from "@/sanity/lib/live";
import { NOT_FOUND_PAGE_QUERY } from "@/sanity/queries/pages";
import { PageBuilder } from "@/components/PageBuilder";

export default async function NotFound() {
  const { data: page } = await sanityFetch({
    query: NOT_FOUND_PAGE_QUERY,
  });

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
        <title>Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground">
          The page you are looking for could not be found.
        </p>
      </div>
    );
  }

  return (
    <>
      <title>{page.metaTitle || "Page Not Found"}</title>
      {page.metaDescription && (
        <meta name="description" content={page.metaDescription} />
      )}
      <meta name="robots" content="noindex, nofollow" />
      <PageBuilder
        documentId={page._id}
        documentType={page._type}
        content={page.content}
      />
    </>
  );
}
