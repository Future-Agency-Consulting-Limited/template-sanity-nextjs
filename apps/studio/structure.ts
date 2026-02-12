import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // content
      //S.documentTypeListItem("page").title("Pages"),
      S.listItem().title("Reusable Sections").child(
        S.list().title("Reusable Sections"),
        /* add document schemas used by components here, eg CTAs:
              ```typescript
              .items([S.documentTypeListItem("cta").title("CTAs")]),
              ```
             */
      ),
      S.divider(),

      // configuration options
      //S.documentTypeListItem("siteSettings").title("Site Settings"),
      S.divider(),

      // all other documents (filtering out documents added above)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== "page" &&
          item.getId() !== "cta" &&
          item.getId() !== "menu" &&
          item.getId() !== "siteSettings" &&
          item.getId() !== "media.tag",
      ),
    ]);
