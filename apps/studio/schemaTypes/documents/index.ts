/**
 * Sanity Schema Types - Documents index
 *
 * Use this file to export all document schema types so they're available in
 * Sanity studio.
 */
import { pageType } from "@/schemaTypes/documents/pageType";
import { siteSettingsType } from "@/schemaTypes/documents/siteSettingsType";
import { hubspotFormType } from "@/schemaTypes/documents/hubspotFormType";
import { blogType } from "@/schemaTypes/documents/blogType";
import { authorType } from "@/schemaTypes/documents/authorType";
import { blogCategoryType } from "@/schemaTypes/documents/blogCategoryType";

export const documentSchemaTypes = [
  pageType,
  siteSettingsType,
  blogType,
  authorType,
  blogCategoryType,
  hubspotFormType,
];
