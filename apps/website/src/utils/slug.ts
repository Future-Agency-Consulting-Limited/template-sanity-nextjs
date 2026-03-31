export type SlugLanguage = "emea" | "apac";

export function parseSlugAndLanguage(slugParts: string[]) {
  const cleanSlugParts = slugParts.filter(Boolean);
  const [firstPart, ...restParts] = cleanSlugParts;

  if (firstPart === "emea" || firstPart === "apac") {
    return {
      language: `en_${firstPart}`,
      fullSlug: cleanSlugParts.join("/"),
      bareSlug: restParts.join("/"),
    };
  }

  return {
    language: undefined,
    fullSlug: cleanSlugParts.join("/"),
    bareSlug: cleanSlugParts.join("/"),
  };
}
