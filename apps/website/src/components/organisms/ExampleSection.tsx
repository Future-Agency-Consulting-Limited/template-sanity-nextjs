import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { PortableText, stegaClean } from "next-sanity";

type exampleSectionProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
  { _type: "exampleSection" }
>;

export function ExampleSection({
  title,
  image,
  orientation,
  copy,
}: exampleSectionProps) {
  return (
    <section
      className="container mx-auto flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse"
      data-orientation={stegaClean(orientation) || "imageLeft"}
    >
      {image ? (
        <Image
          className="rounded-xl w-2/3 h-auto"
          src={urlFor(image).width(800).height(600).url()}
          width={800}
          height={600}
          alt=""
        />
      ) : null}
      <div className="w-1/3 flex items-center">
        {title ? (
          <h2 className="text-3xl mx-auto md:text-5xl lg:text-8xl font-light text-pink-500 text-pretty max-w-3xl">
            {title}
          </h2>
        ) : null}
        {/*copy && (*/}
        {/*<PortableText blocks={copy} />)*/}
      </div>
    </section>
  );
}
