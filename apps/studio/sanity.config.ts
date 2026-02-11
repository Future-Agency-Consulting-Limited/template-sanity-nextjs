import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { presentationTool } from "sanity/presentation";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "amberwolf",
  title: "Amberwolf",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "",

  plugins: [
    structureTool({ structure }),
    media(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: `${process.env.SANITY_STUDIO_FRONTEND_SITE_URL}/api/draft-mode/enable`,
        },
        origin: process.env.SANITY_STUDIO_FRONTEND_SITE_URL,
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
