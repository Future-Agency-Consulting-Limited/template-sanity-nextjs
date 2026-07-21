import { documentSchemaTypes } from "@/schemaTypes/documents";
import { objectsSchemaTypes } from "@/schemaTypes/objects";
import { partialSchemaTypes } from "@/schemaTypes/partials";
import { sectionsSchemaTypes } from "@/schemaTypes/sections";

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectsSchemaTypes,
  ...partialSchemaTypes,
  ...sectionsSchemaTypes,
];
