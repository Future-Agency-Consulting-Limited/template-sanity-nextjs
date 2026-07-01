import { defineField } from "sanity";

export const pageSettingsGroup = (
  documentType: string,
  group?: string,
  fieldset?: string,
) => {
  return [
    defineField({
      name: "title",
      type: "string",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parentPage",
      title: "Parent Page",
      type: "reference",
      to: [{ type: documentType }],
      ...(group && { group: group }),
      ...(fieldset && { fieldset: fieldset }),
      options: {
        filter: ({ document }) => {
          // filter out current page and the home page
          const currentId = document._id.replace(/^drafts\./, "");
          return {
            filter: `
              _id != $currentId &&
              _id != ("drafts." + $currentId) &&
              _id != *[_type == "siteSettings"][0].homePage._ref &&
              _id != ("drafts." + *[_type == "siteSettings"][0].homePage._ref)
            `,
            params: { currentId },
          };
        },
      },
      // todo refactor so validation rule can be reused for different document types
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value?._ref) return true;

          const currentDocId = context.document?._id?.replace(/^drafts\./, "");
          const selectedRef = value._ref.replace(/^drafts\./, "");

          // Prevent self-referencing
          if (selectedRef === currentDocId) {
            return "A page cannot be its own parent.";
          }

          // Walk up the ancestor chain and check for cycles
          const visited = new Set<string>();
          let ancestorId: string | null = selectedRef;

          while (ancestorId) {
            if (visited.has(ancestorId)) break;
            visited.add(ancestorId);

            if (ancestorId === currentDocId) {
              return "This would create a circular parent reference.";
            }

            // Fetch the next ancestor's parentPage ref
            // todo cleanup sanity API fetch
            const result = await context
              .getClient({ apiVersion: "2024-01-01" })
              .fetch<{ parentRef: string | null }>(
                `*[_type == "${documentType}" && _id in [$id, "drafts." + $id]][0]{
                  "parentRef": parentPage._ref
                }`,
                { id: ancestorId },
              );

            ancestorId = result?.parentRef?.replace(/^drafts\./, "") ?? null;
          }

          return true;
        }),
    }),
  ];
};
