import {
  filteredDocumentListItems,
  singletonDocumentListItem,
} from "sanity-plugin-singleton-management";
import type { StructureResolver } from "sanity/structure";
import { SANITY_STUDIO_FEATURE_FLAG_BLOG } from "@/env";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      /** -- Content Document Types ----------------------------------------- */
      S.documentTypeListItem("page").title("Pages"),
      S.listItem()
        .title("Reusable Sections")
        .child(
          S.list()
            .title("Reusable Sections")
            /* add document schemas used by components here, eg CTAs:
          ```typescript
          .items([S.documentTypeListItem("cta").title("CTAs")]),
          ```
        */
            .items([
              S.documentTypeListItem("hubspotForm").title("HubSpot Forms"),
            ]),
        ),

      S.divider(),

      /** -- Blog Document Types--------------------------------------------- */
      ...(SANITY_STUDIO_FEATURE_FLAG_BLOG === "true"
        ? [
            S.documentTypeListItem("blog").title("Blogs"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("blogCategory").title("Blog Categories"),
            S.divider(),
          ]
        : []),

      /** -- Settings Document Types----------------------------------------- */
      singletonDocumentListItem({
        S,
        context,
        type: "siteSettings", // Schema type
        title: "Site Settings", // Required for showing multiple singletons of the same schema type
        id: "siteSettings", // Required for showing multiple singletons of the same schema type
      }),

      S.divider(),

      /**
       * Automatically list all other document types
       *   - Singletons are filtered out automatically
       *   - Other document types can be filtered out by adding them to the
       *     filter function below
       */
      ...filteredDocumentListItems({ S, context }).filter(
        (item) =>
          item.getId() !== "media.tag" &&
          item.getId() !== "page" &&
          item.getId() !== "hubspotForm" &&
          item.getId() !== "blog" &&
          item.getId() !== "author" &&
          item.getId() !== "blogCategory",
      ),
    ]);
