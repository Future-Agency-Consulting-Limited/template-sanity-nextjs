import { defineField } from "sanity";

export const experimentGroup = (group?: string, fieldset?: string) => {
  return [
    defineField({
      name: "experiments",
      title: "Experiments",
      description: "Configure A/B testing variation redirects for this page.",
      type: "array",
      of: [{ type: "growthbookExperiment" }],
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
    }),
  ];
};
