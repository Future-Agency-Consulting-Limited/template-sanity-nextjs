"use client";

import { useHubspotForm } from "next-hubspot";
import { env } from "@/env/client";

export interface HubspotFormProps {
  formId: string;
}

export default function HubspotForm({ formId }: HubspotFormProps) {
  const formWrapperId = `hubspot-form-wrapper-${formId}`;
  const { isFormCreated, isError, error } = useHubspotForm({
    portalId: env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    formId: formId,
    target: `#${formWrapperId}`,
  });

  return <div id={formWrapperId} />;
}
