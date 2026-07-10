import { documentSchemaTypes } from "@/schemaTypes/documents";
import { objectSchemaTypes } from "@/schemaTypes/objects";
import { partialSchemaTypes } from "@/schemaTypes/partials";
import { sectionTypes } from "@/schemaTypes/sections";

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectSchemaTypes,
  ...partialSchemaTypes,
  ...sectionTypes,
];
