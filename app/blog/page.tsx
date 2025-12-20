import { Metadata } from 'next';
import { BlogContent } from '@/components/blog/BlogContent';

export const metadata: Metadata = {
  title: 'מאמרים - טיפים ומידע על שיקום שיניים',
  description: 'מאמרים מקצועיים על שיקום שיניים, תותבות, כתרים, גשרים וטיפים לתחזוקה',
};

export default function BlogPage() {
  return <BlogContent />;
}

