import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Plots & Farmhouses in Bhopal | Book a Site Visit",
  description:
    "Premium plotted developments and farmhouse projects in and around Bhopal, planned for living, investment and long-term value.",
  openGraph: {
    title: "Premium Plots & Farmhouses in Bhopal",
    description:
      "Thoughtfully planned plots and farmhouse projects around Bhopal. Book a site visit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-card focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
