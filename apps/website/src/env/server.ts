import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

/**
 * Server-side environment variable schema.
 *
 * Add new .env variables here so that they are type checked and
 * available in the rest of the app.
 *
 * For NEXT_PUBLIC_* variables, use client.ts instead.
 *
 * @see {@link https://env.t3.gg/docs/nextjs|T3.gg env - Next.js setup}
 * @see {@link https://zod.dev/api|Zod - Defining schemas}
 */
export const env = createEnv({
  server: {
    SANITY_API_READ_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
