import { syncTagInvalidateEventHandler } from "@sanity/functions";

//todo get base url from env
//const REVALIDATE_URL = `${env.SANITY_STUDIO_FRONTEND_SITE_URL}/api/revalidate-tags`;
const REVALIDATE_URL = `https://fg-template-sanity-nextjs.netlify.app/api/revalidate-tags`;

//todo add bearer token

export const handler = syncTagInvalidateEventHandler(
  async ({ event, done }) => {
    try {
      const { syncTags } = event.data;

      //todo send bearer token authorization header
      const res = await fetch(REVALIDATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: syncTags }),
      });
      console.log(`Revalidated ${syncTags.length} tags, HTTP ${res.status}`);

      const response = await done(syncTags);
      console.log(
        "Invalidation complete, Sanity responded with HTTP",
        response.status,
      );
    } catch (e) {
      console.error("Error invoking Sanity invalidation done endpoint!", e);
    }
  },
);
