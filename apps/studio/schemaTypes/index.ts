import { documents } from "@/schemaTypes/documents";
import { objects } from "@/schemaTypes/objects";
import { partials } from "@/schemaTypes/partials";

export const schemaTypes = [...documents, ...objects, ...partials];
