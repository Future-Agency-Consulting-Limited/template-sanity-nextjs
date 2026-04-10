import { defineArrayMember, defineType } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    defineArrayMember({ type: "exampleSection" }),
    defineArrayMember({
      type: "reference",
      to: [{ type: "hubspotForm" }],
      title: "HubSpot Form",
    }),
    // defineArrayMember({ type: "hero" }),
    // defineArrayMember({ type: "splitImage" }),
    // defineArrayMember({ type: "features" }),
    // defineArrayMember({ type: "faqs" }),
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
        },
      ],
    },
  },
});
