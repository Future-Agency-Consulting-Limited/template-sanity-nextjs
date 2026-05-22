import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
// todo uncomment once you've added image and button components from dodl
//import { image } from "../primitives/image";
//import { button } from "../primitives/button";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  options: {
    singleton: true, // Identify this document as a singleton
  },

  fieldsets: [
    { name: "general", title: "General" },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "blog", title: "Blog" },
    { name: "integrations", title: "Integrations" },
  ],
  groups: [
    { name: "general", title: "General" },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "blog", title: "Blog" },
    { name: "integrations", title: "Integrations" },
  ],

  // General -------------------------------------------------------------------
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      fieldset: "general",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homePage",
      type: "reference",
      to: [{ type: "page" }],
      fieldset: "general",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notFoundPage",
      title: "404 Not Found Page",
      type: "reference",
      to: [{ type: "page" }],
      fieldset: "general",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    // todo uncomment once you've added image component from dodl
    /*
    image({
      name: "logo",
      title: "Site Logo",
      fieldset: "general",
      group: "general",
    }),
    image({
      name: "defaultOgImage",
      title: "Default Open Graph Image",
      description:
        "The fallback Open Graph image used for social media sharing when a page doesn't have a thumbnail specified.",
      fieldset: "general",
      group: "general",
    }),
     */

    // Header ------------------------------------------------------------------
    // todo uncomment once you've added a menu document type
    /*
    defineField({
      name: "headerMenu",
      title: "Header Menu",
      type: "reference",
      to: [{ type: "menu" }],
      fieldset: "header",
      group: "header",
    }),
     */

    // Footer ------------------------------------------------------------------
    // todo uncomment once you've added image component from dodl
    /*
    image({
      name: "footerLogo",
      title: "Footer Logo",
      fieldset: "footer",
      group: "footer",
    }),
     */

    // todo uncomment once you've added a menu document type
    /*
    defineField({
      name: "footerMenu",
      title: "Footer Menu",
      type: "reference",
      to: [{ type: "menu" }],
      fieldset: "footer",
      group: "footer",
    }),
     */

    // Integrations ------------------------------------------------------------
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      type: "string",
      description: "The ID for Google Tag Manager (GTM) integration",
      fieldset: "integrations",
      group: "integrations",
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
