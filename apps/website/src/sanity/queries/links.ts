import { defineQuery } from "next-sanity";

/**
 * construct a URL path from a page reference.
 *
 * Works generically for any document type that has fields:
 * - slug: slug
 * - parentPage: reference.
 *
 * params:
 * - _type: string - document type
 * - _id: string - document id
 */
export const LINK_URL_PATH_QUERY = defineQuery(`
*[
  defined(slug.current) &&
  _id == $_id
][0]{
  _id,
  _type,
  "slug": slug.current,
  "parentSlugs": [
    parentPage->parentPage->parentPage->parentPage->parentPage->slug.current,
    parentPage->parentPage->parentPage->parentPage->slug.current,
    parentPage->parentPage->parentPage->slug.current,
    parentPage->parentPage->slug.current,
    parentPage->slug.current
  ][defined(@)],
  "nextParentPage": parentPage->parentPage->parentPage->parentPage->parentPage->parentPage
}
`);
