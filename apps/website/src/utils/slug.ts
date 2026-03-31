import type { Region } from "@/utils/region";

export function parseSlugAndLanguage(region: Region, slugParts: string[]) {
  const cleanSlugParts = slugParts.filter(Boolean);

  return {
    language: `en_${region}`,
    regionSlug: `${region}/${cleanSlugParts.join("/")}`,
    bareSlug: cleanSlugParts.join("/"),
  };
}
