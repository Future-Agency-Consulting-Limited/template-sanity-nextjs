import type { SchemaTypeDefinition } from "sanity";
import { exampleSectionType } from "./exampleSectionType";
import { linkType } from "./linkType";

export const objectsSchemaTypes: SchemaTypeDefinition[] = [
  exampleSectionType,
  linkType,
];
