import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import "@/globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        {/*<Header />*/}
        <main className="bg-white min-h-screen">
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </main>
        {/*<Footer />*/}
      </body>
    </html>
  );
}
