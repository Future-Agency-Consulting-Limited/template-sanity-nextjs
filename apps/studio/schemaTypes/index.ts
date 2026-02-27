import { documentSchemaTypes } from "@/schemaTypes/documents";
import { objectSchemaTypes } from "@/schemaTypes/objects";
import { partialSchemaTypes } from "@/schemaTypes/partials";

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectSchemaTypes,
  ...partialSchemaTypes,
];
