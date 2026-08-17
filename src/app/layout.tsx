import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { AppProvider } from "@/src/providers/app-provider"; 
import { Toaster as SonnerToaster } from "@/src/components/ui/sonner";
import QueryWrapper from "../providers/query-wrapper";
import Hydrated from "../providers/hydrated";
import { getUser } from "../lib/server-fetches";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FlowBoard — Organize your work, flow your way",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Hydrated queryKey={["user"]} queryFn={getUser}>
              <AppProvider>{children}</AppProvider>
            </Hydrated> 
            <SonnerToaster />
          </ThemeProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
