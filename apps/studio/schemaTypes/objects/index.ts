import type { SchemaTypeDefinition } from "sanity";
import { exampleSectionType } from "./exampleSectionType";
import { growthbookExperimentType } from "./growthbookExperimentType";
import { linkType } from "./linkType";

export const objectsSchemaTypes: SchemaTypeDefinition[] = [
  exampleSectionType,
  growthbookExperimentType,
  linkType,
];
