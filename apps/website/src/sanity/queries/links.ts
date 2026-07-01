import { defineQuery } from "next-sanity";

/**
 * get an array of 5 levels of parent documents from a document id
 *
 * can be used recursively to construct a URL path from a page reference.
 *
 * Works generically for any document type that has fields:
 * - slug: slug
 * - parentPage: reference.
 *
 * params:
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
  "nextParentPageId": parentPage->parentPage->parentPage->parentPage->parentPage->parentPage->_id
}
`);
