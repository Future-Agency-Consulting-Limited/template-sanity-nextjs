import { defineArrayMember, defineField, defineType } from "sanity";
import { FlaskConical, Split } from "lucide-react";
import { env } from "@/env";

export const growthbookExperimentType = defineType({
  name: "growthbookExperiment",
  title: "GrowthBook Experiment",
  type: "object",
  icon: FlaskConical,
  fields: [
    defineField({
      name: "key",
      title: "Experiment Key",
      type: "string",
      description:
        "The unique experiment key defined in GrowthBook (e.g. 'homepage-hero-test').",
      validation: (Rule) =>
        Rule.required().error("Experiment key is required."),
    }),
    defineField({
      name: "name",
      title: "Experiment Name",
      type: "string",
      description: "Optional friendly label for this experiment.",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Enable or disable this experiment without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "variations",
      title: "Variations",
      type: "array",
      description:
        "Define variations and select a page to redirect to when assigned each variation.",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one variation is required."),
      of: [
        defineArrayMember({
          name: "variation",
          title: "Variation",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Variation Key",
              type: "number",
              description:
                "Variation key in GrowthBook (e.g. 1, 2) - the control is the current page.",
              initialValue: 1,
              validation: (Rule) =>
                Rule.required()
                  .min(1)
                  .integer()
                  .error("Variation key is required and must more than 0."),
            }),
            defineField({
              name: "redirectPage",
              title: "Redirect Page",
              type: "reference",
              description:
                "Select a page to redirect to for this variation. Leave empty to stay on current page (e.g. control).",
              to: [
                { type: "page" },
                ...(env.SANITY_STUDIO_FEATURE_FLAG_BLOG
                  ? [{ type: "blog" }]
                  : []),
              ],
              options: {
                filter: ({ document }) => {
                  const currentId = document?._id?.replace(/^drafts\./, "");
                  if (!currentId) return {};
                  return {
                    filter: `_id != $currentId && _id != ("drafts." + $currentId)`,
                    params: { currentId },
                  };
                },
              },
            }),
          ],
          preview: {
            select: {
              key: "key",
              redirectTitle: "redirectPage.title",
              redirectSlug: "redirectPage.slug.current",
            },
            prepare({ key, redirectTitle, redirectSlug }) {
              const title = `Variation  ${key || "—"}`;
              const subtitle = redirectTitle
                ? `Redirects to: ${redirectTitle}${redirectSlug ? ` (/${redirectSlug})` : ""}`
                : "No redirect (stays on current page)";
              return {
                title,
                subtitle,
                media: Split,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: "name",
      key: "key",
      variations: "variations",
      active: "active",
    },
    prepare({ name, key, variations, active }) {
      const count = Array.isArray(variations) ? variations.length : 0;
      const status = active === false ? " (Inactive)" : "";
      return {
        title: `${name || key || "Untitled Experiment"}${status}`,
        subtitle: `Key: ${key || "—"} • ${count} variation${count === 1 ? "" : "s"}`,
        media: FlaskConical,
      };
    },
  },
});
