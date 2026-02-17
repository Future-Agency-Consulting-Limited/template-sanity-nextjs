import {
  filteredDocumentListItems,
  singletonDocumentListItem,
} from "sanity-plugin-singleton-management";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      /** -- Content Document Types ----------------------------------------- */
      S.documentTypeListItem("page").title("Pages"),
      S.listItem().title("Reusable Sections").child(
        S.list().title("Reusable Sections"),
        /* add document schemas used by components here, eg CTAs:
          ```typescript
          .items([S.documentTypeListItem("cta").title("CTAs")]),
          ```
        */
      ),

      S.divider(),
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
        (item) => item.getId() !== "media.tag" && item.getId() !== "page",
      ),
    ]);
