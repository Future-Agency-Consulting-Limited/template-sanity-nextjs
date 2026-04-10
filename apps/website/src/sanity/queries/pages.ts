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
        _type == "reference" => @->
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
  *[_type == "page" && slug.current == $slug][0]{
    ...,
    content[]{
      ...,
      _type == "reference" => @->
    }
  }
`);

export const PAGE_METADATA_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    slug,
    metaTitle,
    metaDescription,
  }
`);
