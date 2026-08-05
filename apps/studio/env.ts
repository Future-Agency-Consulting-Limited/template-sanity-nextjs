import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

const siteUrlSchema = z
  .url({
    protocol: /^https?$/,
  })
  .refine(
    (value) => {
      const { hostname } = new URL(value);
      return hostname === "localhost" || z.regexes.domain.test(hostname);
    },
    {
      message: "Must be a valid http(s) URL using localhost or a real domain",
    },
  );

const optionalStringBoolDefaultFalseSchema = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.stringbool().default(false));

/**
 * Sanity Studio environment variable schema.
 *
 * Add new environment variables here so that they are type checked and
 * available in the rest of the studio.
 *
 * @see {@link https://env.t3.gg/docs/core|T3.gg env - Core setup}
 * @see {@link https://zod.dev/api|Zod - Defining schemas}
 */
export const env = createEnv({
  clientPrefix: "SANITY_STUDIO_",
  client: {
    SANITY_STUDIO_PROJECT_ID: z.string().trim().min(1),
    SANITY_STUDIO_APP_ID: z.string().trim().min(1),
    SANITY_STUDIO_DATASET: z.string().trim().min(1),
    SANITY_STUDIO_SANITY_API_VERSION: z.iso.date(),
    SANITY_STUDIO_FRONTEND_SITE_URL: siteUrlSchema,
    SANITY_STUDIO_FEATURE_FLAG_BLOG: optionalStringBoolDefaultFalseSchema,
  },
  runtimeEnv: {
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_APP_ID: process.env.SANITY_STUDIO_APP_ID,
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_SANITY_API_VERSION:
      process.env.SANITY_STUDIO_SANITY_API_VERSION,
    SANITY_STUDIO_FRONTEND_SITE_URL:
      process.env.SANITY_STUDIO_FRONTEND_SITE_URL,
    SANITY_STUDIO_FEATURE_FLAG_BLOG:
      process.env.SANITY_STUDIO_FEATURE_FLAG_BLOG,
  },
});
