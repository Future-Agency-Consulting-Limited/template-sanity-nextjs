export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-17";

export const SANITY_DATASET = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const SANITY_PROJECT_ID = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const NEXT_PUBLIC_SANITY_STUDIO_URL = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_URL",
);

export const NEXT_PUBLIC_REVALIDATE = assertValue(
  process.env.NEXT_PUBLIC_REVALIDATE,
  "Missing environment variable: NEXT_PUBLIC_REVALIDATE",
);

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
