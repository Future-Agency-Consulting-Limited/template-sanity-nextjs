import { FaHubspot } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export const hubspotFormType = defineType({
  name: "hubspotForm",
  title: "Hubspot Form",
  type: "document",
  icon: FaHubspot,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formId",
      title: "HubSpot Form ID",
      type: "string",
      description: "The value of data-form-id in HubSpot's embed code.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "HubSpot Form",
      };
    },
  },
});
