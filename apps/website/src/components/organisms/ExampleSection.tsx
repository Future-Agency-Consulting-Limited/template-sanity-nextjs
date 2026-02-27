import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { PortableText, stegaClean } from "next-sanity";

type exampleSectionProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
  { _type: "exampleSection" }
>;

/**
 * A simple example section to demonstrate usage of the page builder
 *
 * This shouldn't be considered a best practice example of how to write your components.
 * It's just a basic demonstration with:
 *   - url generation for an image
 *   - stega cleaning for page previews in Sanity Studio
 *   - default styling of portable text
 *
 * @param title
 * @param image
 * @param orientation
 * @param copy
 * @constructor
 */
export function ExampleSection({
  title,
  image,
  orientation,
  copy,
}: exampleSectionProps) {
  return (
    <section
      className="container mx-auto flex gap-8 py-16 flex-col data-[orientation='imageRight']:flex-col-reverse lg:flex-row lg:data-[orientation='imageRight']:flex-row-reverse "
      data-orientation={stegaClean(orientation) || "imageLeft"}
    >
      {image ? (
        <Image
          className="rounded-xl max-w-full lg:w-2/3 h-auto"
          src={urlFor(image).width(800).height(600).url()}
          width={800}
          height={600}
          alt=""
        />
      ) : null}
      <div className="flex flex-col grow">
        {title ? (
          <h2 className="text-3xl md:text-5xl lg:text-8xl font-light text-pink-500 max-w-3xl text-center pb-8">
            {title}
          </h2>
        ) : null}
        {copy && (
          <div className="prose">
            <PortableText value={copy} />
          </div>
        )}
      </div>
    </section>
  );
}
