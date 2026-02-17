/**
 * Sanity Schema Types - Documents index
 *
 * Use this file to export all document schema types so they're available in
 * Sanity studio.
 */
import { pageType } from "@/schemaTypes/documents/pageType";
import { siteSettingsType } from "@/schemaTypes/documents/siteSettingsType";

export const documentSchemaTypes = [pageType, siteSettingsType];
