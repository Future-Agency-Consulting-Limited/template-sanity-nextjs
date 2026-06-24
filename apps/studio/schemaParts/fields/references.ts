import { defineField } from "sanity";

export interface LinkFieldOptions {
  name?: string;
  title?: string;
  fieldset?: string;
  group?: string;
  pageRefOps?: Record<string, any>;
  urlRefOps?: Record<string, any>;
}

/**
 * Reusable Link Object field that allows the user to choose between an internal page reference
 * and an external URL, automatically hiding the unused field and displaying the linked target in previews.
 */
export const linkField = ({
  name = "link",
  title = "Link",
  fieldset,
  group,
  pageRefOps = {},
  urlRefOps = {},
}: LinkFieldOptions = {}) => {
  return defineField({
    name,
    title,
    type: "object",
    ...(fieldset && { fieldset }),
    ...(group && { group }),
    fields: [
      defineField({
        name: "linkType",
        title: "Link Type",
        type: "string",
        options: {
          list: [
            { title: "Internal Page", value: "page" },
            { title: "External URL", value: "url" },
          ],
          layout: "radio",
          direction: "horizontal",
        },
        initialValue: "page",
      }),
      defineField({
        name: "page",
        title: "Page",
        type: "reference",
        to: [{ type: "page" }], // Add other page types as needed (e.g., blogPost, etc.)
        options: {
          disableNew: true,
          ...pageRefOps.options,
        },
        hidden: ({ parent }) => parent?.linkType !== "page",
        ...pageRefOps,
      }),
      defineField({
        name: "url",
        title: "URL",
        type: "url",
        validation: (Rule) =>
          Rule.uri({
            scheme: ["http", "https", "mailto", "tel"],
            allowRelative: true,
          }),
        hidden: ({ parent }) => parent?.linkType !== "url",
        ...urlRefOps,
      }),
    ],
    preview: {
      select: {
        title: "title",
        linkType: "linkType",
        pageTitle: "page.title",
        url: "url",
      },
      prepare({ title, linkType, pageTitle, url }) {
        let subtitle = "Not set";
        if (linkType === "page") {
          subtitle = pageTitle
            ? `Page: ${pageTitle}`
            : "Page: (No page selected)";
        } else if (linkType === "url") {
          subtitle = url ? `URL: ${url}` : "URL: (No URL entered)";
        }
        return {
          title: title || "Link",
          subtitle,
        };
      },
    },
  });
};

// Retaining backwards compatible / single field helpers if needed elsewhere in the project
export const pageReference = (
  fieldset?: string,
  group?: string,
  ops?: object,
) => {
  return defineField({
    name: "page",
    title: "Page",
    type: "reference",
    to: [{ type: "page" }],
    options: {
      disableNew: true,
    },
    ...(fieldset && { fieldset: fieldset }),
    ...(group && { group: group }),
    ...(ops ? { ...ops } : { hidden: ({ parent }) => parent?.url?.length > 0 }),
  });
};

export const urlReference = (fieldset?: string, group?: string, ops?: object) =>
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

export const pageOrUrlReference = (
  fieldset?: string,
  group?: string,
  pageRefOps?: object,
  urlRefOps?: object,
) => {
  return [
    pageReference(fieldset, group, pageRefOps),
    urlReference(fieldset, group, urlRefOps),
  ];
};

// todo add other references, eg:
//   - external url
//   - relative url (including html anchors like #page-anchor)
//   - email address
//   - phone number
