import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

// // Define the actions that should be available for singleton documents
// const singletonActions = new Set(["publish", "discardChanges", "restore"]);
//
// // Define the singleton document types
// const singletonTypes = new Set(["siteSettings"]);

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  options: {
    singleton: true, // Identify this document as a singleton
  },

  fieldsets: [],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "homePage",
      type: "reference",
      to: [{ type: "page" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
