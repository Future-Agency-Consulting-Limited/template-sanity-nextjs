import { useHubspotForm } from "next-hubspot";
import { env } from "@/env/client";

const HubspotForm = (formId: string) => {
  const { isFormCreated, isError, error } = useHubspotForm({
    portalId: env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    formId: formId,
    target: "#hubspot-form-wrapper",
  });

  return <div id="hubspot-form-wrapper" />;
};
