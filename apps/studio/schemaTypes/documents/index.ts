/**
 * Sanity Schema Types - Documents index
 *
 * Use this file to export all document schema types so they're available in
 * Sanity studio.
 */
import { pageType } from "@/schemaTypes/documents/pageType";
import { siteSettingsType } from "@/schemaTypes/documents/siteSettingsType";
import { hubspotFormType } from "@/schemaTypes/documents/hubspotFormType";

export const documentSchemaTypes = [
  pageType,
  siteSettingsType,
  hubspotFormType,
];
