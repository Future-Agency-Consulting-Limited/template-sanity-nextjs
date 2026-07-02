import { createClient } from "@sanity/client";
import { SANITY_STUDIO_DATASET, SANITY_STUDIO_PROJECT_ID } from "@/env";

export const API_VERSION = "2024-01-01";

/**
 * A reusable Sanity client for use inside the studio (e.g. schema validation rules, custom tools).
 *
 * Do NOT use this on the website/frontend side — use the client in `apps/website/src/sanity/lib/client.ts` instead.
 */
export const client = createClient({
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
});
