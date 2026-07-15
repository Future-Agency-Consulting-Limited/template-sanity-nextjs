import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";

/**
 * Get parsed site settings from Sanity
 */
export const getSiteSettings: () => Promise<SITE_SETTINGS_QUERY_RESULT> =
  async function (): Promise<SITE_SETTINGS_QUERY_RESULT> {
    const { data: siteSettings } = (await sanityFetch({
      query: SITE_SETTINGS_QUERY,
    })) as { data: SITE_SETTINGS_QUERY_RESULT };

    // add parsing logic here if needed, or preferably in the query itself

    return siteSettings;
  };
