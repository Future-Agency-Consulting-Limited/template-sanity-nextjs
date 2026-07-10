import { defineArrayMember, defineType } from "sanity";
import { sectionTypes } from "@/schemaTypes/sections/index";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    ...sectionTypes.map((sectionType) =>
      defineArrayMember({ type: sectionType.name }),
    ),
    defineArrayMember({ type: "exampleSection" }),
    defineArrayMember({
      type: "reference",
      to: [{ type: "hubspotForm" }],
      title: "HubSpot Form",
    }),
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
