import { defineQuery } from "next-sanity";

const homepageSubQuery = `
  *[
    _type == "siteSettings" &&
    defined(homePage->_id)
  ][0...1]{
    "slug": "",
    "_updatedAt": homePage->_updatedAt,
    "_id": homePage->_id
  }
`;

const pagesSubQuery = `
  *[
    _type == "page" &&
    _id != *[_type == "siteSettings"][0].homePage._ref
  ]{
    "slug": slug.current,
    _updatedAt,
    _id
  }
`;

export const SITEMAP_QUERY = defineQuery(
  `[
    ...${homepageSubQuery},
    ...${pagesSubQuery}
    {
      "slug": slug.current,
      _updatedAt,
      _id
    }
  ]`,
);
