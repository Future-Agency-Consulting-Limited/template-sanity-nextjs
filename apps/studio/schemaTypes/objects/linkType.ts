import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";

export const labelField = (options?: { fieldset?: string; group?: string }) =>
  defineField({
    name: "label",
    title: "Label",
    type: "string",
    validation: (Rule) => Rule.required(),
    ...options,
  });

/**
 * Page reference field
 *
 * @todo test
 */
export const pageRefField = ({
  fieldset,
  group,
  to,
  ops,
}: {
  fieldset?: string;
  group?: string;
  to?: { type: string }[];
  ops?: object;
} = {}) => {
  const defaultTo = [{ type: "page" }];

  return defineField({
    name: "page",
    title: "Page",
    type: "reference",
    to: to || defaultTo,
    options: {
      disableNew: true,
    },
    ...(fieldset && { fieldset: fieldset }),
    ...(group && { group: group }),
    ...(ops ? { ...ops } : { hidden: ({ parent }) => parent?.url?.length > 0 }),
  });
};

/**
 * URL field
 *
 * Accepts relative, http, https, mailto, and tel urls
 *
 * @todo test
 */
export const urlField = ({
  fieldset,
  group,
  ops,
}: { fieldset?: string; group?: string; ops?: object } = {}) =>
  defineField({
    name: "url",
    title: "Url",
    type: "url",
    validation: (Rule) =>
      Rule.uri({
        scheme: ["http", "https", "mailto", "tel"],
        allowRelative: true,
      }),
    ...(fieldset && { fieldset: fieldset }),
    ...(group && { group: group }),
    ...(ops ? { ...ops } : { hidden: ({ parent }) => !!parent?.page }),
  });

/**
 * Add mutually exclusive page reference and url fields to a
 * Sanity schema type
 *
 *
 * @usage ```
 * fieldsets: [
 *   {
 *     name: "link",
 *     title: "Link",
 *   },
 * ],
 * fields: [
 *   ...pageRefAndUrlFields({fieldset: "link"})`
 * ]
 * ```
 *
 * @todo test
 */
export const pageRefAndUrlFields = ({
  fieldset,
  group,
  pageRefTo,
  pageRefOps,
  urlRefOps,
}: {
  fieldset?: string;
  group?: string;
  pageRefTo?: { type: string }[];
  pageRefOps?: object;
  urlRefOps?: object;
} = {}) => {
  return [
    pageRefField({
      fieldset: fieldset,
      group: group,
      to: pageRefTo,
      ops: pageRefOps,
    }),
    urlField({ fieldset: fieldset, group: group, ops: urlRefOps }),
  ];
};

export const openInNewTabField = (options?: {
  fieldset?: string;
  group?: string;
}) =>
  defineField({
    name: "openInNewTab",
    title: "Open in new browser tab",
    type: "boolean",
    initialValue: false,
    ...options,
  });

/**
 * Defines the schema for a "link" type object.
 *
 * Consolidates the following into a single reusable object that can be added as a single field to schema types:
 *   - label
 *   - URL or page reference
 *   - additional link options
 *
 * @usage
 * ```
 * defineField({
 *   name: "link",
 *   title: "Link",
 *   type: "link",
 *   options: { collapsible: true, collapsed: false },
 * })
 * ```
 */
export const linkType = defineType({
  name: "link",
  type: "object",
  options: {
    modal: {
      type: "dialog",
    },
  },
  fields: [labelField(), ...pageRefAndUrlFields(), openInNewTabField()],
  icon: LinkIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "Link",
        media: LinkIcon,
      };
    },
  },
});
