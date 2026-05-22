"use client";

import { client } from "@/sanity/lib/client";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import HubspotForm from "@/components/patterns/HubspotForm";
import { ExampleSection } from "@/components/sections/ExampleSection";

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
