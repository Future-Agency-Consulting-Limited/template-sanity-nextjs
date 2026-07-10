import { defineCliConfig } from "sanity/cli";
import tsconfigPaths from "vite-tsconfig-paths";

// using process.env for environment variables in the CLI, as they won't have loaded yet if we use `apps/studio/env.ts`

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  deployment: {
    appId: process.env.SANITY_STUDIO_APP_ID ?? "",

    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
  typegen: {
    path: "../website/src/**/*.{ts,tsx,js,jsx}", // glob pattern to your typescript files. Can also be an array of paths
    schema: "./schema.json", // path to your schema file, generated with 'sanity schema extract' command
    generates: "../website/src/sanity/types.ts", // path to the output file for generated type definitions
    overloadClientMethods: true, // set to false to disable automatic overloading the sanity client
  },
});
