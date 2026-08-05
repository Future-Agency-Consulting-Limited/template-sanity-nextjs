import { schemaTypes } from "@/schemaTypes";
import { structure } from "@/structure";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { singletonTools } from "sanity-plugin-singleton-management";
import { env } from "@/env";

export default defineConfig({
  name: "insert-project-name",
  title: "INSERT PROJECT NAME",

  projectId: env.SANITY_STUDIO_PROJECT_ID,
  dataset: env.SANITY_STUDIO_DATASET,

  releases: {
    enabled: false, // enterprise tier feature
  },

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: `${env.SANITY_STUDIO_FRONTEND_SITE_URL}/api/draft-mode/enable`,
        },
        origin: env.SANITY_STUDIO_FRONTEND_SITE_URL,
      },
    }),
    media(),
    visionTool(),
    singletonTools(),
  ],

  schema: {
    types: schemaTypes,
  },
});
