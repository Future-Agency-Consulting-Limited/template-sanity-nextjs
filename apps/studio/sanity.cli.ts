import path from "path";
import { defineCliConfig } from "sanity/cli";
import {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_APP_ID,
} from "@/env";

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID,
    dataset: SANITY_STUDIO_DATASET,
  },
  deployment: {
    appId: SANITY_STUDIO_APP_ID,

    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname),
      },
    },
  },
  typegen: {
    path: "../website/src/**/*.{ts,tsx,js,jsx}", // glob pattern to your typescript files. Can also be an array of paths
    schema: "./schema.json", // path to your schema file, generated with 'sanity schema extract' command
    generates: "../website/src/sanity/types.ts", // path to the output file for generated type definitions
    overloadClientMethods: true, // set to false to disable automatic overloading the sanity client
  },
});
