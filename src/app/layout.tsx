import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { Toaster as SonnerToaster } from "@/src/components/ui/sonner";
import QueryWrapper from "../providers/query-wrapper";
import Hydrated from "../providers/hydrated";
import { getSideBar, getUser } from "../lib/server-fetches";

const inter = Inter({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "FlowBoard — Organize your work, flow your way",
  icons: "/fav-icon.png",

  description:
    "FlowBoard is a modern project and task management app with boards, lists, calendars, and more.",
  openGraph: {
    title: "FlowBoard",
    description:
      "Organize your work, flow your way. Boards, lists, calendars, and tasks in one place.",
    images: [{ url: "https://bolt.new/static/og_default.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "https://bolt.new/static/og_default.png" }],
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        {" "}
        <QueryWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Hydrated queryKey={["user"]} queryFn={getUser}>
              <Hydrated queryKey={["sidebar"]} queryFn={getSideBar}>
                {children}
              </Hydrated>
            </Hydrated>
            <SonnerToaster />
          </ThemeProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
