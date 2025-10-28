// lib/contentful-client.ts
"use client";

import { createClient } from "contentful";
import { useMemo } from "react";

/**
 * Returns a memoised Contentful client.
 * Runs **only on the browser**, so env vars are read from `process.env`
 * (Next.js injects them into the client bundle when the file is marked "use client").
 */
export function useContentfulClient() {
  return useMemo(() => {
    const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
    const env = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? "master";

    if (!space || !token) {
      throw new Error(
        "Contentful credentials missing. Check .env.local (CONTENTFUL_SPACE_ID / CONTENTFUL_ACCESS_TOKEN)."
      );
    }

    return createClient({
      space,
      accessToken: token,
      environment: env,
    });
  }, []);
}