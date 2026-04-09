import { createEnv } from "@t3-oss/env-nextjs";
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

const optionalTrimmedStringSchema: z.ZodType<string | undefined> = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z.string().optional(),
);

/**
 * Client-side environment variable schema.
 *
 * Add new NEXT_PUBLIC_* variables here so that they are type checked and
 * available in the rest of the app.
 *
 * For other environment variables, use server.ts instead.
 *
 * @see {@link https://env.t3.gg/docs/nextjs|T3.gg env - Next.js setup}
 * @see {@link https://zod.dev/api|Zod - Defining schemas}
 */
export const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_API_VERSION: z.iso.date(),
    NEXT_PUBLIC_SANITY_DATASET: z.string().trim().min(1),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().trim().min(1),
    NEXT_PUBLIC_SANITY_STUDIO_URL: siteUrlSchema,
    NEXT_PUBLIC_SITE_URL: siteUrlSchema,
    NEXT_PUBLIC_REVALIDATE: z.coerce.number<number>().int().positive(),
    NEXT_PUBLIC_ALLOW_CRAWLER_BOTS: z.stringbool(),
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: optionalTrimmedStringSchema,
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_REVALIDATE: process.env.NEXT_PUBLIC_REVALIDATE,
    NEXT_PUBLIC_ALLOW_CRAWLER_BOTS: process.env.NEXT_PUBLIC_ALLOW_CRAWLER_BOTS,
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
});
