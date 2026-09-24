import { experimentGroup } from "@/schemaParts/groups/experimentGroup";
import { pageSettingsGroup } from "@/schemaParts/groups/pageSettingsGroup";
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
    {
      name: "experiment",
      title: "Experiment",
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
    {
      name: "experiment",
      title: "Experiment",
      options: {
        collapsible: true,
        collapsed: true,
      },
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
    ...experimentGroup("experiment", "experiment"),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
