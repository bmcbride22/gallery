import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import TopNav from "~/app/_components/TopNav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ThemeProvider } from "~/lib/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/post-hog-provider";
// import dynamic from "next/dynamic";

// const PostHogPageView = dynamic(() => import("./_analytics/PosthogPageView"), {
//   ssr: false,
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Gallery",
  description: "Image / File upload starter",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className={`font-sans ${inter.variable}`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* <PostHogPageView /> */}
              <div className="grid h-screen grid-rows-[auto,1fr]">
                <TopNav />
                <main className="overflow-y-scroll">{children}</main>
              </div>
              {modal}
              <div id="modal-root" />
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
