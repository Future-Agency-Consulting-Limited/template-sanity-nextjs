import { documentI18nLanguageField } from "@/schemaParts/fields/documentI18nPlugin";
import { seoGroup } from "@/schemaParts/groups/seoGroup";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "pageContent",
      title: "Page Content",
    },
  ],
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "pageContent",
      title: "Page Content",
    },
  ],
  fields: [
    documentI18nLanguageField(),
    ...seoGroup("seo", "seo"),
    defineField({
      name: "mainImage",
      type: "image",
      group: "pageContent",
      fieldset: "pageContent",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Sections",
      type: "pageBuilder",
      group: "pageContent",
      fieldset: "pageContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      language: "language",
    },
    prepare(selection) {
      const { title, slug, language } = selection;

      return {
        title,
        subtitle: `${language ? language + " | " : ""}${slug ?? ""}`,
      };
    },
  },
});
