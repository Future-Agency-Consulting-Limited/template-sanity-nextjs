"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4  rounded-full px-4 py-2 shadow-md bg-[#6272f9] text-white font-bold border border-gray-600 hover:brightness-110 transition-colors ease-in-out duration-300"
    >
      Disable Draft Mode
    </a>
  );
}
