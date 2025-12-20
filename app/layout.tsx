import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-body",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heading",
  weight: ["400", "500", "700"],
  display: "swap",
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "מעבדת שיניים - טכנאי שיניים מקצועי",
    template: "%s | מעבדת שיניים",
  },
  description:
    "מעבדת שיניים מקצועית בישראל - ייצור תותבות, כתרים, גשרים ושיקום שיניים. טכנולוגיות CAD/CAM, חומרים איכותיים ושירות מקצועי. טכנאי שיניים מוסמך.",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: baseUrl,
    title: "מעבדת שיניים - טכנאי שיניים מקצועי",
    description:
      "מעבדת שיניים מקצועית בישראל - ייצור תותבות, כתרים, גשרים ושיקום שיניים. טכנולוגיות CAD/CAM, חומרים איכותיים ושירות מקצועי. טכנאי שיניים מוסמך.",
    siteName: "מעבדת שיניים",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} ${heebo.variable} font-body`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

