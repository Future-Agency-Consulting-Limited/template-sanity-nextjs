"use client";

import { useMemo } from "react";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";

import { client } from "@/sanity/lib/client";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

import HubspotForm from "@/components/patterns/HubspotForm";
import { ExampleSection } from "@/components/sections/ExampleSection";
import { PageSection } from "@/components/primitives/page-section";
import {
  AccordionsSection,
  AccordionsSectionProps,
} from "@/components/sections/accordions-section";
import {
  CardCarousel,
  CardCarouselProps,
} from "@/components/sections/card-carousel";
import { CardGrid, CardGridProps } from "@/components/sections/card-grid";
// import {
//   ContactSection,
//   ContactSectionProps,
// } from "@/components/sections/contact-section";
import {
  CtaCardSection,
  CtaCardSectionProps,
} from "@/components/sections/cta-card-section";
import { HeroMedia, HeroMediaProps } from "@/components/sections/hero-media";
// import { HeroSimple, HeroSimpleProps } from "@/components/sections/hero-simple";
import {
  MarqueeLogos,
  MarqueeLogosProps,
} from "@/components/sections/marquee-logos";
// import {
//   MarqueeText,
//   MarqueeTextProps,
// } from "@/components/sections/marquee-text";
import {
  NewsCarousel,
  NewsCarouselProps,
} from "@/components/sections/news-carousel";
// import { NewsGrid, NewsGridProps } from "@/components/sections/news-grid";
import {
  TwoUpGroup,
  TwoUpGroupProps,
} from "@/components/sections/two-up-group";

// Static Sanity config defined outside of render
const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERY_RESULT>["content"];
  documentId: string;
  documentType: string;
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

  // Memoize main container attribute string
  const mainDataSanity = useMemo(
    () =>
      createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString(),
    [documentId, documentType],
  );

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main data-sanity={mainDataSanity}>
      {blocks.map((block) => {
        if (!block?._key || !block?._type) return null;

        // Visual Drag Handle attribute computed per block
        const dragHandleAttribute = createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: `content[_key=="${block._key}"]`,
        }).toString();

        const renderBlockContent = () => {
          switch (block._type) {
            case "exampleSection":
              return <ExampleSection {...block} />;

            case "hubspotForm":
              return <HubspotForm formId={block.formId} />;

            case "accordionsSection":
              return (
                <AccordionsSection {...(block as AccordionsSectionProps)} />
              );

            case "cardCarousel":
              return <CardCarousel {...(block as CardCarouselProps)} />;

            case "cardGrid":
              return <CardGrid {...(block as CardGridProps)} />;

            // case "contactSection":
            //   return <ContactSection {...(block as ContactSectionProps)} />;

            case "ctaCardSection":
              return <CtaCardSection {...(block as CtaCardSectionProps)} />;

            case "heroMedia":
              return <HeroMedia {...(block as HeroMediaProps)} />;

            // case "heroSimple":
            //   return <HeroSimple {...(block as HeroSimpleProps)} />;

            case "marqueeLogos":
              return <MarqueeLogos {...(block as MarqueeLogosProps)} />;

            // case "marqueeText":
            //   return <MarqueeText {...(block as MarqueeTextProps)} />;

            case "newsCarousel":
              return <NewsCarousel {...(block as NewsCarouselProps)} />;

            // case "newsGrid":
            //   return <NewsGrid {...(block as NewsGridProps)} />;

            case "twoUpGroup":
              return <TwoUpGroup {...(block as TwoUpGroupProps)} />;

            default:
              null;
          }
        };

        const blockContent = renderBlockContent();

        if (!blockContent) {
          return (
            <div
              key={block._key}
              className="bg-pink-500 border-2 -mb-2 border-dashed border-yellow-300 text-white p-8 text-center text-lg font-bold"
            >
              Block not found: {(block as { _type: string })._type}
            </div>
          );
        }

        return (
          <div key={block._key} data-sanity={dragHandleAttribute}>
            <PageSection
              backgroundImage={
                block?.backgroundImage
                  ? urlFor(block.backgroundImage).width(1920).height(1080).url()
                  : undefined
              }
              background={block?.background}
              size={block?.size}
              fullWidth={block?.fullWidth}
            >
              {blockContent}
            </PageSection>
          </div>
        );
      })}
    </main>
  );
}
