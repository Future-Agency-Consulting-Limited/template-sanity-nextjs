import {
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_FRONTEND_SITE_URL,
  SANITY_STUDIO_PROJECT_ID,
} from "@/env";
import { schemaTypes } from "@/schemaTypes";
import { structure } from "@/structure";
import {
  documentInternationalization,
  useDeleteTranslationAction,
  useDuplicateWithTranslationsAction,
} from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { singletonTools } from "sanity-plugin-singleton-management";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "insert-project-name",
  title: "INSERT PROJECT NAME",

  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: `${SANITY_STUDIO_FRONTEND_SITE_URL}/api/draft-mode/enable`,
        },
        origin: SANITY_STUDIO_FRONTEND_SITE_URL,
      },
    }),
    media(),
    visionTool(),
    singletonTools(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en_emea", title: "EMEA (English)" },
        { id: "en_apac", title: "APAC (English)" },
      ],
      schemaTypes: ["page"],
    }),
  ],

  document: {
    actions: (prev, context) => {
      const translatedSchemaTypes = ["page"];

      if (translatedSchemaTypes.includes(context.schemaType)) {
        return [
          ...prev,
          useDeleteTranslationAction,
          useDuplicateWithTranslationsAction,
        ];
      }

      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
});
