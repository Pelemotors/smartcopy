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

// בדיקה בטוחה של baseUrl
function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (envUrl) {
    try {
      new URL(envUrl); // בדיקה שהערך תקין
      return envUrl;
    } catch {
      // אם לא תקין, נשתמש בברירת מחדל
    }
  }
  
  // ברירת מחדל לפי סביבה
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  return 'https://example.com';
}

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Sarit Hadar - כתיבת תוכן ועריכת לשון",
    template: "%s | Sarit Hadar",
  },
  description:
    "כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי. מדויק, נקי, אנושי — בלי מילים מפוצצות ובלי טעויות.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: baseUrl,
    title: "Sarit Hadar - כתיבת תוכן ועריכת לשון",
    description:
      "כתיבת תוכן שיווקי ועריכת לשון לעסקים: דפי נחיתה, אתרים, מודעות ומיקרו־קופי. מדויק, נקי, אנושי — בלי מילים מפוצצות ובלי טעויות.",
    siteName: "Sarit Hadar",
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

