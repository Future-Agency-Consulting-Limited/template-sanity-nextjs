import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const exampleSectionType = defineType({
  name: "exampleSection",
  type: "object",
  fields: [
    defineField({
      name: "orientation",
      type: "string",
      options: {
        list: [
          { value: "imageLeft", title: "Image Left" },
          { value: "imageRight", title: "Image Right" },
        ],
      },
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "copy",
      type: "copy",
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: "Example Section",
        media: media ?? BlockContentIcon,
      };
    },
  },
});
