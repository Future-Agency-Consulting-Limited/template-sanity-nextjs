import {
  internalGroqTypeReferenceTo,
  Link,
  LINK_URL_PATH_QUERY_RESULT,
  PageReference,
} from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/live";
import { LINK_URL_PATH_QUERY } from "@/sanity/queries/links";

/**
 * Convert a sanity link object to a URL
 */
export type DocumentTypeUrlPrefix = {
  documentType: string;
  urlPrefix: string;
};
export type DocumentTypeUrlPrefixMap = DocumentTypeUrlPrefix[];

export const documentTypeUrlPrefixMap: DocumentTypeUrlPrefixMap = [
  {
    documentType: "page",
    urlPrefix: "",
  },
  {
    documentType: "blog",
    urlPrefix: "/blog",
  },
];

export type parsedLink = {
  label: string;
  url: string;
  openInNewTab: boolean;
};

export async function parseLink(link: Link): Promise<parsedLink> {
  const url = await parseUrl(link);

  return {
    label: link.label,
    url: url,
    openInNewTab: link.openInNewTab ?? false,
  };
}

async function parseUrl(link: Link): Promise<string> {
  if (link.url) {
    return link.url;
  }

  if (link.page) {
    return await parseLinkRef(link.page);
  }

  throw new Error("Invalid link");
}

async function parseLinkRef(page: PageReference): Promise<string> {
  const map = documentTypeUrlPrefixMap.find(
    (item) => item.documentType === page[internalGroqTypeReferenceTo],
  );
  if (!map) {
    throw new Error("Invalid document type");
  }

  const slugs = await collectPathSlugs(page);
  return `${map.urlPrefix}/${slugs.join("/")}`;
}

async function collectPathSlugs(page: PageReference): Promise<string[]> {
  const data = await pathSlugs(page);

  // todo add document type to return data from initial pathSlugs()
  if (!data) {
    throw new Error("Page not found");
  }

  // one chunk, ordered top ancestor -> this page
  const slugs = [...data.parentSlugs, data.slug].filter(
    (slug): slug is string => slug !== null,
  );

  // nextParentPage is higher up the tree -> its fragments go first
  if (data.nextParentPage) {
    const ancestorSlugs = await collectPathSlugs(data.nextParentPage);
    return [...ancestorSlugs, ...slugs];
  }

  return slugs;
}

async function pathSlugs(
  page: PageReference,
): Promise<LINK_URL_PATH_QUERY_RESULT> {
  const { data } = (await sanityFetch({
    query: LINK_URL_PATH_QUERY,
    params: {
      _id: page._ref,
    },
    stega: false,
  })) as { data: LINK_URL_PATH_QUERY_RESULT };

  if (!data) {
    throw new Error("document not found for link");
  }

  return data;
}
