import { createImageUrlBuilder } from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url";

import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
