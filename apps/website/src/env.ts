import yn from "yn";

export const SANITY_API_VERSION = parseValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "string",
  "2026-02-17",
);

export const SANITY_DATASET = parseValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

export const SANITY_PROJECT_ID = parseValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const NEXT_PUBLIC_SANITY_STUDIO_URL = parseValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  "NEXT_PUBLIC_SANITY_STUDIO_URL",
);

export const NEXT_PUBLIC_SITE_URL = parseValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "NEXT_PUBLIC_SITE_URL",
);

export const NEXT_PUBLIC_REVALIDATE = parseValue(
  process.env.NEXT_PUBLIC_REVALIDATE,
  "NEXT_PUBLIC_REVALIDATE",
);

export const NEXT_PUBLIC_ALLOW_CRAWLER_BOTS = parseValue(
  process.env.NEXT_PUBLIC_ALLOW_CRAWLER_BOTS,
  "NEXT_PUBLIC_ALLOW_CRAWLER_BOTS",
  "boolean",
);

function parseValue(
  value: unknown,
  valueName: string,
  valueOutputType: "string" | "boolean" = "string",
  defaultValue: unknown = undefined,
) {
  // if we have a default value, use it if the value is undefined
  const setValue =
    value === undefined && defaultValue !== undefined ? defaultValue : value;

  const checkedValue = assertValue(setValue, valueName);

  if (valueOutputType === "boolean") {
    const boolValue = yn(checkedValue);
    if (boolValue === undefined) {
      throw new Error(
        `Environment variable "${valueName}" is not a valid boolean value`,
      );
    }
    return boolValue;
  }

  return checkedValue;
}

function assertValue<T>(value: T | undefined, valueName: string): T {
  if (value === undefined || value === "") {
    throw new Error(`Missing environment variable: ${valueName}`);
  }

  return value;
}
