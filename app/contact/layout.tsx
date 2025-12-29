import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'צור קשר - Sarit Hadar',
  description: 'דברו איתי. רוצים לשדרג טקסט, דף נחיתה או אתר? שלחו לי כמה פרטים — ואחזור אליכם',
  openGraph: {
    title: 'צור קשר - Sarit Hadar',
    description: 'דברו איתי. רוצים לשדרג טקסט, דף נחיתה או אתר?',
    url: `${baseUrl}/contact`,
    siteName: 'Sarit Hadar',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

