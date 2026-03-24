/**
 * Provides intellisense for Tailwind CSS classes in tagged template literal strings.
 *
 * ## Requirements
 * - Tailwind CSS IntelliSense extension for your editor.
 * - Tailwind CSS installed in your project.
 * - tailwind config file in your project.
 *
 * ## Configuration
 *
 * ### PhpStorm
 * 1. Go to: Settings -> Languages & Frameworks -> Style Sheets -> Tailwind CSS.
 * 2. Add the following to your Language Server settings:
 * ```json
 * "classFunctions": ["tw"]
 * ```
 * 3. You may also need to add a regex to the experimental section, ie:
 * ```json
 * "experimental": {
 *   "configFile": null,
 *   "classRegex": [
 *     ["tw`([^`]*)`"]
 *   ]
 * }
 * ```
 * 4. Restart PhpStorm.
 *
 * ### VSCode
 * 1. Search settings for "Tailwind CSS: classFunctions"
 * 2. Add an entry for "tw" to the list.
 *
 * ## Usage
 *
 * In a JavaScript or TypeScript file, import the `tw` function and use it in a tagged template literal.
 *
 * @example ```js
 * import { tw } from "@/utils/tailwind/templateLiteralIntellisense";
 * const myString = tw`w-full bg-red-500`
 * ```
 * @see https://github.com/tailwindlabs/tailwindcss-intellisense#extension-settings
 * @param strings
 * @param exprs
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const tw = (strings: TemplateStringsArray, ...exprs: unknown[]) =>
  strings.join("");
