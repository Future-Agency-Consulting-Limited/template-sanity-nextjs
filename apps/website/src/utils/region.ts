export type Region = "emea" | "apac";

export function isValidRegion(region: string) {
  return ["emea", "apac"].includes(region);
}
