"use client";

import { useEffect, useId, useState } from "react";
import { useHubspotForm } from "next-hubspot";
import { env } from "@/env/client";
import LoadingSpinner from "@/components/primitives/LoadingSpinner";

export interface HubspotFormProps {
  formId: string;
}

export default function HubspotForm({ formId }: HubspotFormProps) {
  const id = useId();
  const formWrapperId = `hubspot-form-wrapper-${formId}-${id.replace(/:/g, "")}`;
  const [isLoaded, setIsLoaded] = useState(false);

  const { isError, error } = useHubspotForm({
    portalId: env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    formId,
    target: `#${formWrapperId}`,
  });

  useEffect(() => {
    const wrapper = document.getElementById(formWrapperId);

    if (!wrapper) {
      return;
    }

    const markLoadedIfFormExists = () => {
      if (wrapper.children.length > 0) {
        setIsLoaded(true);
        return true;
      }

      return false;
    };

    if (markLoadedIfFormExists()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (markLoadedIfFormExists()) {
        observer.disconnect();
      }
    });

    observer.observe(wrapper, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [formWrapperId]);

  if (isError) {
    console.error("Hubspot form loading error:", error);
  }

  return (
    <div className="relative min-h-10">
      {!isLoaded && !isError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-muted-foreground/10 rounded-xl"
          role="status"
          aria-label="Loading form"
        >
          <LoadingSpinner className="text-muted-foreground" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div id={formWrapperId} aria-live="polite" />
    </div>
  );
}
