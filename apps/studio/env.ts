export const SANITY_STUDIO_PROJECT_ID = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
);
export const SANITY_STUDIO_APP_ID = assertValue(
  process.env.SANITY_STUDIO_APP_ID,
  "Missing environment variable: SANITY_STUDIO_APP_ID",
);
export const SANITY_STUDIO_DATASET = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET",
);
export const SANITY_STUDIO_FRONTEND_SITE_URL = assertValue(
  process.env.SANITY_STUDIO_FRONTEND_SITE_URL,
  "Missing environment variable: SANITY_STUDIO_FRONTEND_SITE_URL",
);

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
