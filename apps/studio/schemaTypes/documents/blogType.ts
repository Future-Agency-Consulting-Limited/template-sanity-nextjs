import { seoGroup } from "@/schemaParts/groups/seoGroup";
import { Newspaper } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageSettingsGroup } from "@/schemaParts/groups/pageSettingsGroup";
//import { image } from "../primitives/image";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: Newspaper,
  groups: [
    {
      name: "page",
      title: "Page",
    },
    {
      name: "blog-metadata",
      title: "Blog Metadata",
    },
    {
      name: "content",
      title: "Content",
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
      name: "blog-metadata",
      title: "Blog Metadata",
    },
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    ...pageSettingsGroup("blog", "page", "page"),
    // image({
    //   name: "mainImage",
    //   title: "Page Thumbnail",
    //   group: "seo",
    //   fieldset: "seo",
    // }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "date",
      group: "blog-metadata",
      fieldset: "blog-metadata",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "blog-metadata",
      fieldset: "blog-metadata",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "Only the first category will be displayed.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
      group: "blog-metadata",
      fieldset: "blog-metadata",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 1,
      group: "blog-metadata",
      fieldset: "blog-metadata",
    }),
    defineField({
      name: "content",
      title: "Sections",
      type: "array",
      group: "content",
      fieldset: "content",
      of: [
        defineArrayMember({ type: "exampleSection" }),
        // defineArrayMember({ type: "cardGrid" }),
        // defineArrayMember({ type: "accordionsSection" }),
        // defineArrayMember({ type: "marqueeLogos" }),
        // defineArrayMember({ type: "newsCarousel" }),
        // defineArrayMember({ type: "testimonialSection" }),
        // defineArrayMember({ type: "twoUpGroup" }),
        // defineArrayMember({ type: "twoUpTabs" }),
        // defineArrayMember({ type: "cardCarousel" }),
        // defineArrayMember({ type: "standout" }),
        // defineArrayMember({ type: "contentSection" }),
        // defineArrayMember({ type: "formSection" }),
        // defineArrayMember({ type: "ctaSection" }),
        // defineArrayMember({ type: "blockquoteSection" }),
        // defineArrayMember({ type: "imageGallery" }),
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaType) =>
                `/block-previews/${schemaType}.png`,
            },
          ],
        },
      },
    }),
    ...seoGroup("seo", "seo"),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      authorName: "author.name",
      categoryTitle: "categories.0.title",
      date: "date",
    },
    prepare(selection) {
      const { title, media, authorName, categoryTitle, date } = selection;

      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "No date";

      const subtitleParts = [formattedDate, authorName, categoryTitle].filter(
        Boolean,
      );

      return {
        title,
        subtitle: subtitleParts.join(" | "),
        media,
      };
    },
  },
});
