import { defineField, defineType, FieldDefinition } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { env } from "@/env";

const labelField = (options?: { fieldset?: string; group?: string }) =>
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
 */
const pageRefField = ({
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
  const defaultTo = [
    { type: "page" },
    ...(env.SANITY_STUDIO_FEATURE_FLAG_BLOG ? [{ type: "blog" }] : []),
  ];

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
 */
const urlField = ({
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
  fields: [labelField(), ...pageRefAndUrlFields()],
  icon: LinkIcon,
  preview: {
    select: {
      title: "title",
      link: "link",
    },
    prepare({ link }) {
      return {
        title: link.label,
        subtitle: link.pageRef || link.url || "Link",
        media: LinkIcon,
      };
    },
  },
});

export const linkField = (options?: Partial<FieldDefinition>) =>
  defineField({
    name: "link",
    title: "Link",
    type: "link",
    options: { collapsible: true, collapsed: false },
    ...options,
  });
