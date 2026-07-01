import { seoGroup } from "@/schemaParts/groups/seoGroup";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { pageSettingsGroup } from "@/schemaParts/groups/pageSettingsGroup";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "page",
      title: "Page",
    },
    {
      name: "pageContent",
      title: "Page Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fieldsets: [
    {
      name: "page",
      title: "Page",
    },
    {
      name: "pageContent",
      title: "Page Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    ...pageSettingsGroup("page", "page", "page"),
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
    ...seoGroup("seo", "seo"),
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
