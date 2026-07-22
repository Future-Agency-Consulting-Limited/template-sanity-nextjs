"use client";

import { client } from "@/sanity/lib/client";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import HubspotForm from "@/components/patterns/HubspotForm";
import { ExampleSection } from "@/components/sections/ExampleSection";
// import {
//   AccordionsSection,
//   AccordionsSectionProps,
// } from "@/components/sections/accordions-section";
// import {
//   CardCarousel,
//   CardCarouselProps,
// } from "@/components/sections/card-carousel";
// import { CardGrid, CardGridProps } from "@/components/sections/card-grid";
//import { ContactSection, ContactSectionProps } from "@/components/sections/contact-section";
// import {
//   CtaCardSection,
//   CtaCardSectionProps,
// } from "@/components/sections/cta-card-section";
// import { HeroMedia, HeroMediaProps } from "@/components/sections/hero-media";
// import { HeroSimple, HeroSimpleProps } from "@/components/sections/hero-simple";
// import {
//   MarqueeLogos,
//   MarqueeLogosProps,
// } from "@/components/sections/marquee-logos";
// import { MarqueeText, MarqueeTextProps } from "@/components/sections/marquee-text";
// import {
//   NewsCarousel,
//   NewsCarouselProps,
// } from "@/components/sections/news-carousel";
// import { NewsGrid, NewsGridProps } from "@/components/sections/news-grid";
// import {
//   TwoUpGroup,
//   TwoUpGroupProps,
// } from "@/components/sections/two-up-group";

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERY_RESULT>["content"];
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<
    NonNullable<PAGE_QUERY_RESULT>["content"] | undefined,
    NonNullable<PAGE_QUERY_RESULT>
  >(content, (state, action) => {
    if (action.id === documentId) {
      return action?.document?.content?.map(
        (block) => state?.find((s) => s._key === block?._key) || block,
      );
    }
    return state;
  });

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString()}
    >
      {blocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        );

        switch (block._type) {
          case "exampleSection":
            return (
              <DragHandle key={block._key}>
                <ExampleSection {...block} />
              </DragHandle>
            );
          case "hubspotForm":
            return (
              <DragHandle key={block._key}>
                <HubspotForm formId={block.formId} />
              </DragHandle>
            );

          /*
          case "accordionsSection":
            return (
              <DragHandle key={block._key}>
                <AccordionsSection {...(block as AccordionsSectionProps)} />
              </DragHandle>
            );
          */

          /*
          case "cardCarousel":
            return (
              <DragHandle key={block._key}>
                <CardCarousel {...(block as CardCarouselProps)} />
              </DragHandle>
            );
          */

          /*
          case "cardGrid":
            return (
              <DragHandle key={block._key}>
                <CardGrid {...(block as CardGridProps)} />
              </DragHandle>
            );
          */

          /*
          case "contactSection":
            return (
              <DragHandle key={block._key}>
                <ContactSection {...(block as ContactSectionProps)} />
              </DragHandle>
            );
          */

          /*
          case "ctaCardSection":
            return (
              <DragHandle key={block._key}>
                <CtaCardSection {...(block as CtaCardSectionProps)} />
              </DragHandle>
            );
          */

          /*
          case "heroMedia":
            return (
              <DragHandle key={block._key}>
                <HeroMedia {...(block as HeroMediaProps)} />
              </DragHandle>
            );
          */

          /*
          case "heroSimple":
            return (
              <DragHandle key={block._key}>
                <HeroSimple {...(block as HeroSimpleProps)} />
              </DragHandle>
            );
          */

          /*
          case "marqueeLogos":
            return (
              <DragHandle key={block._key}>
                <MarqueeLogos {...(block as MarqueeLogosProps)} />
              </DragHandle>
            );
          */

          /*
          case "marqueeText":
            return (
              <DragHandle key={block._key}>
                <MarqueeText {...(block as MarqueeTextProps)} />
              </DragHandle>
            );
          */

          /*
          case "newsCarousel":
            return (
              <DragHandle key={block._key}>
                <NewsCarousel {...(block as NewsCarouselProps)} />
              </DragHandle>
            );
          */

          /*
          case "newsGrid":
            return (
              <DragHandle key={block._key}>
                <NewsGrid {...(block as NewsGridProps)} />
              </DragHandle>
            );
          */

          /*
          case "twoUpGroup":
            return (
              <DragHandle key={block._key}>
                <TwoUpGroup {...(block as TwoUpGroupProps)} />
              </DragHandle>
            );
          */

          default: {
            const fallbackBlock = block as {
              _key: string;
              _type: string;
            };

            return (
              <div key={fallbackBlock._key}>
                Block not found: {fallbackBlock._type}
              </div>
            );
          }
        }
      })}
    </main>
  );
}
