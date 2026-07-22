import { Link, LINK_URL_PATH_QUERY_RESULT } from "@/sanity/types";
import { sanityFetch } from "@/sanity/lib/live";
import { LINK_URL_PATH_QUERY } from "@/sanity/queries/links";

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

/**
 * Recursively walks a Sanity GROQ query result (object, array, or primitive)
 * and augments any `button`-typed object that has a `link` field by setting
 * its `href` property to the resolved URL from that link, while leaving the
 * original `link` object intact.
 *
 * Works for any query result shape (e.g. HOME_PAGE_QUERY_RESULT, PAGE_QUERY_RESULT, etc.)
 * since it doesn't depend on a specific structure — it just looks for objects
 * with `_type === "button"` that have a `link` property anywhere in the tree.
 *
 * @param page Any Sanity query result (object, array, or primitive value).
 * @return A deep copy of `page` with every `button` object that has a `link` extended with an `href` property.
 */
export async function parsePageLinks<T>(page: T): Promise<T> {
  if (Array.isArray(page)) {
    return (await Promise.all(
      page.map((item) => parsePageLinks(item)),
    )) as unknown as T;
  }

  if (page !== null && typeof page === "object") {
    if (
      (page as { _type?: string })._type === "button" &&
      (page as { link?: Link }).link
    ) {
      const { link } = page as { link: Link };
      const { label, url } = await parseLink(link);

      return {
        ...page,
        label,
        href: url,
      } as unknown as T;
    }

    const entries = await Promise.all(
      Object.entries(page as Record<string, unknown>).map(
        async ([key, value]) => [key, await parsePageLinks(value)] as const,
      ),
    );

    return Object.fromEntries(entries) as T;
  }

  return page;
}

/**
 * Convert a sanity link object to a URL with label and settings that can be used in anchor tags
 *
 * @param link sanity link object
 */
export async function parseLink(link: Link): Promise<parsedLink> {
  const url = await parseUrl(link);

  return {
    label: link.label,
    url: url,
    openInNewTab: link.openInNewTab ?? false,
  };
}

/**
 * Parses the provided link object and returns a URL string.
 *
 * @param {Link} link - The link object containing URL or page reference.
 * @return {Promise<string>} A promise that resolves to the parsed URL string. Defaults to "/" for invalid links.
 */
async function parseUrl(link: Link): Promise<string> {
  if (link.url) {
    return link.url;
  }

  if (link.page) {
    return await parseLinkRef(link.page._ref);
  }

  // invalid link, default to homepage
  return "/";
}

/**
 * Get a URL string from a document ID
 *
 * @param {string} documentId - The document ID to parse.
 * @return {Promise<string>} A promise that resolves to the parsed URL string.
 */
export async function parseLinkRef(documentId: string): Promise<string> {
  const slugs = await collectPathSlugs(documentId);

  const map = documentTypeUrlPrefixMap.find(
    (item) => item.documentType === slugs._type,
  );

  if (!map) {
    throw new Error("Invalid document type");
  }

  if (map.documentType === "page") {
    // remove first item from array if it's "home"
    if (slugs.slugs[0] === "home") {
      slugs.slugs.shift();
    }
  }

  return `${map.urlPrefix}/${slugs.slugs.join("/")}`;
}

/**
 * Collects all path slugs for a specific document in a hierarchical structure,
 * including its ancestors' slugs ordered from the top ancestor to the current document.
 *
 * @param {string} documentId - The unique identifier of the document for which slugs are being collected.
 * @return {Promise<{ _type: string; slugs: string[] }>} A promise that resolves to an object containing the document type (_type)
 * and a list of slugs (slugs) ordered hierarchically.
 * @throws {Error} Throws an error if the document is not found.
 */
async function collectPathSlugs(
  documentId: string,
): Promise<{ _type: string; slugs: string[] }> {
  const data = await pathSlugs(documentId);

  if (!data) {
    throw new Error("Page not found");
  }

  // one chunk, ordered top ancestor -> this page
  const slugs = [...data.parentSlugs, data.slug].filter(
    (slug): slug is string => slug !== null,
  );

  // nextParentPage is higher up the tree -> its fragments go first
  if (data.nextParentPageId) {
    const { slugs: ancestorSlugs } = await collectPathSlugs(
      data.nextParentPageId,
    );
    return { _type: data._type, slugs: [...ancestorSlugs, ...slugs] };
  }

  return { _type: data._type, slugs };
}

/**
 * Fetches the slugs and related path information for a given document ID.
 *
 * @param {string} documentId - The ID of the document to retrieve the path slugs for.
 * @return {Promise<LINK_URL_PATH_QUERY_RESULT>} A promise that resolves to the result of the path query.
 * @throws {Error} If the document is not found for the given ID.
 */
async function pathSlugs(
  documentId: string,
): Promise<LINK_URL_PATH_QUERY_RESULT> {
  const { data } = (await sanityFetch({
    query: LINK_URL_PATH_QUERY,
    params: {
      _id: documentId,
    },
    stega: false,
  })) as { data: LINK_URL_PATH_QUERY_RESULT };

  if (!data) {
    throw new Error("document not found for link");
  }

  return data;
}
