import { defineQuery } from "next-sanity";

export const BLOG_PAGE_SLUGS_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    defined(slug.current)
  ]{ "slug": [slug.current] }
`);

export const BLOG_PAGE_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    author->,
    categories[]->,
    content[]{
      ...,
      _type == "reference" => @->
    }
  }
`);

export const BLOG_PAGE_METADATA_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0]{
    slug,
    metaTitle,
    metaDescription,
    noIndex,
    noFollow,
  }
`);
