import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[
    _type == "siteSettings"
    && _id == "siteSettings"
  ][0]{
    ...,
    "notFoundPageSlug": notFoundPage->slug.current,
  }
`);
