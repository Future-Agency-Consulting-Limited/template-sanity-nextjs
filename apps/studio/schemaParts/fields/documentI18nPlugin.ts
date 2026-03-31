import { defineField } from "sanity";

export const documentI18nLanguageField = () =>
  defineField({
    // should match 'languageField' plugin configuration setting, if customised.
    // see documentInternationalization() in sanity.config.ts
    name: "language",
    type: "string",
    readOnly: true,
    hidden: true,
  });
