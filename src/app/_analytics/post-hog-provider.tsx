"use client";
import { useAuth, useSession } from "@clerk/nextjs";
import { is } from "drizzle-orm";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://app.posthog.com", // or 'https://eu.posthog.com' if your PostHog is hosted in Europe
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, session } = useSession();

  useEffect(() => {
    if (!isSignedIn || !session) return posthog.reset();
    const user = session.user;
    if (user.id) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress,
        name: user.fullName,
        sessionId: session.id,
      });
    }
  }, [session, isSignedIn]);

  return children;
}
