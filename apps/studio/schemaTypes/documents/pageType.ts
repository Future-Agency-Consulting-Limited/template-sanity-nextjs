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
    // defineField({
    //   name: "link",
    //   title: "Link",
    //   type: "link",
    //   options: { collapsible: true, collapsed: false },
    // }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
