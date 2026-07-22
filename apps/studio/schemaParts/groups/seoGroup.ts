import { defineField } from "sanity";

export const seoGroup = (group?: string, fieldset?: string) => {
  return [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      description:
        "Used as the title of the page in a browser tab, and in search results.",
      type: "string",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      description: "Instruct search engines not to index this page.",
      type: "boolean",
      initialValue: false,
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      description: "Instruct search engines not to follow links on this page.",
      type: "boolean",
      initialValue: false,
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
    }),
  ];
};
