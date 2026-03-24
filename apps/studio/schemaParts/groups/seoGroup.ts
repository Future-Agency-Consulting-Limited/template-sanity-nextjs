import { defineField } from "sanity";

export const seoGroup = (group?: string, fieldset?: string) => {
  return [
    defineField({
      name: "title",
      type: "string",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
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
  ];
};
