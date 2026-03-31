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
      ...(group && { group }),
      ...(fieldset && { fieldset }),
      options: {
        source: (doc) => {
          const title = typeof doc.title === "string" ? doc.title : "";
          const language = typeof doc.language === "string" ? doc.language : "";

          const region = language.replace(/^en_/, "");

          return region ? `${region}/${title}` : title;
        },
        slugify: (input) =>
          input
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-/]/g, ""),
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
