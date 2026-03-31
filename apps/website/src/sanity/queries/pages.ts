import { defineQuery } from "next-sanity";

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[
    _type == "page" &&
    defined(slug.current) &&
    slug.current != *[_id == "siteSettings"][0].homePage->slug.current
  ]{ "slug": slug.current }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    homePage->{
      ...,
      content[]{
        ...,
      }
    }
  }
`);

export const HOME_PAGE_METADATA_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    homePage->{
      metaTitle,
      metaDescription,
    }
  }
`);

export const PAGE_QUERY = defineQuery(`
  *[
    _type == "page" &&
    (
      slug.current == $fullSlug ||
      slug.current == $bareSlug
    )][0]{
    ...,
    content[]{
      ...,
    }
  }
`);

export const PAGE_METADATA_QUERY = defineQuery(`
  *[_type == "page" && (
    slug.current == $fullSlug ||
    slug.current == $bareSlug
  )][0]{
    slug,
    metaTitle,
    metaDescription,
  }
`);
