import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ChromeProvider } from "@/components/layout/ChromeContext";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RouteTransition } from "@/components/motion/RouteTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baithak — meeting notes that write themselves",
    template: "%s · Baithak",
  },
  description:
    "Baithak transcribes your meetings and turns them into a summary, decisions and action items with owners.",
  applicationName: "Baithak",
  openGraph: {
    title: "Baithak — meeting notes that write themselves",
    description:
      "Live transcription, a scannable summary, and action items with owners.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e4e0dd",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link t-caption">
          Skip to content
        </a>
        <AnnouncementBar />
        <MotionProvider>
          <ChromeProvider>
            <SiteHeader />
            <RouteTransition>{children}</RouteTransition>
            <SiteFooter />
          </ChromeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
