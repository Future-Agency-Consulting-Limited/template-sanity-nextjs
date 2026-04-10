"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    _hsq: Array<unknown[]>;
  }
}

/**
 * Manually trigger tracking for a page view in HubSpot
 *
 * Intended to be used as part of a Single Page Application (SPA), as HubSpot's
 * tracking only automatically fires for a full page load.
 */
export default function HubspotPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const _hsq = (window._hsq = window._hsq || []);
    _hsq.push(["setPath", window.location.pathname + window.location.search]);
    _hsq.push(["trackPageView"]);
  }, [pathname, searchParams]);

  return null;
}
