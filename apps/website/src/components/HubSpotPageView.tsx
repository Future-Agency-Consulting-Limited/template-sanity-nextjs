"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    _hsq: Array<unknown[]>;
  }
}

export default function HubSpotPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const _hsq = (window._hsq = window._hsq || []);

    _hsq.push(["setPath", window.location.pathname + window.location.search]);
    _hsq.push(["trackPageView"]);

    // _hsq.push([
    //   "setPath",
    //   pathname + (searchParams.toString() ? `?${searchParams}` : ""),
    // ]);
    // _hsq.push(["trackPageView"]);
  }, [pathname, searchParams]);

  return null;
}
