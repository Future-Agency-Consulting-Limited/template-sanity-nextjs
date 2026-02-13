import { schemaTypes } from "@/schemaTypes";
import { structure } from "@/structure";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "insert-project-name",
  title: "INSERT PROJECT NAME",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: `${process.env.SANITY_STUDIO_FRONTEND_SITE_URL}/api/draft-mode/enable`,
        },
        origin: process.env.SANITY_STUDIO_FRONTEND_SITE_URL,
      },
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
