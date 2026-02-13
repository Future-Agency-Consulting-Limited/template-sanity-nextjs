import { defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

// // Define the actions that should be available for singleton documents
// const singletonActions = new Set(["publish", "discardChanges", "restore"]);
//
// // Define the singleton document types
// const singletonTypes = new Set(["siteSettings"]);

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  options: {
    singleton: true, // Identify this document as a singleton
  },

  fieldsets: [],

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
  ],
});
