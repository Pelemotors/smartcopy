// פוסטים סטטיים לבלוג - ללא Supabase

export interface StaticBlogPost {
  id: number;
  slug: string;
  title_he: string;
  title_ru: string;
  content_he: string;
  content_ru: string;
  excerpt_he: string;
  excerpt_ru: string;
  featured_image_url: string;
  published_at: string;
  published: boolean;
  blog_categories: {
    name_he: string;
    name_ru: string;
    slug: string;
  };
  blog_post_tags: Array<{
    blog_tags: {
      name_he: string;
      name_ru: string;
      slug: string;
    };
  }>;
}

export const staticBlogPosts: StaticBlogPost[] = [
  {
    id: 1,
    slug: 'dental-care-tips',
    title_he: 'טיפים לטיפול בשיניים תותבות',
    title_ru: 'Советы по уходу за зубными протезами',
    excerpt_he: 'כיצד לשמור על תותבות שיניים נקיות ובריאות לאורך זמן',
    excerpt_ru: 'Как поддерживать зубные протезы чистыми и здоровыми',
    content_he: `<h1>טיפים לטיפול בשיניים תותבות</h1>
<p>תותבות שיניים דורשות טיפול נכון כדי לשמור עליהן נקיות, בריאות ונוחות לאורך זמן. במאמר זה נציג לכם את הטיפים החשובים ביותר לטיפול נכון בתותבות.</p>
<h2>ניקוי יומיומי</h2>
<p>חשוב לנקות את התותבות מדי יום באמצעות מברשת רכה ומיוחדת לתותבות. השתמשו במים פושרים ובסבון עדין.</p>
<h2>אחסון נכון</h2>
<p>כשאתם לא משתמשים בתותבות, שמרו אותן במים נקיים או בתמיסה מיוחדת לתותבות.</p>
<h2>בדיקות סדירות</h2>
<p>חשוב להגיע לבדיקות סדירות אצל רופא השיניים כדי לוודא שהתותבות עדיין מתאימות ונוחות.</p>`,
    content_ru: `
# Советы по уходу за зубными протезами

Зубные протезы требуют правильного ухода, чтобы оставаться чистыми, здоровыми и удобными в течение длительного времени.
    `,
    featured_image_url: '/images/dental/services/dentures.jpg',
    published_at: new Date().toISOString(),
    published: true,
    blog_categories: {
      name_he: 'טיפים',
      name_ru: 'Советы',
      slug: 'tips',
    },
    blog_post_tags: [],
  },
  {
    id: 2,
    slug: 'dental-crowns-guide',
    title_he: 'מדריך מקיף לכתרים דנטליים',
    title_ru: 'Полное руководство по зубным коронкам',
    excerpt_he: 'כל מה שצריך לדעת על כתרים דנטליים - סוגים, תהליך, ותחזוקה',
    excerpt_ru: 'Все, что нужно знать о зубных коронках',
    content_he: `<h1>מדריך מקיף לכתרים דנטליים</h1>
<p>כתרים דנטליים הם פתרון מצוין לשיקום שיניים פגועות. במדריך זה נסביר לכם על הסוגים השונים, התהליך והתחזוקה.</p>
<h2>סוגי כתרים</h2>
<h3>כתרי זירקוניה</h3>
<p>כתרים חזקים ועמידים, מתאימים לשיניים אחוריות וקדמיות.</p>
<h3>כתרי E-max</h3>
<p>כתרים אסתטיים במיוחד, מתאימים לשיניים קדמיות.</p>
<h3>כתרי מתכת-קרמיקה</h3>
<p>שילוב של חוזק ואסתטיקה.</p>`,
    content_ru: `
# Полное руководство по зубным коронкам

Зубные коронки - отличное решение для восстановления поврежденных зубов.
    `,
    featured_image_url: '/images/dental/services/full-restoration.jpg',
    published_at: new Date().toISOString(),
    published: true,
    blog_categories: {
      name_he: 'מדריכים',
      name_ru: 'Руководства',
      slug: 'guides',
    },
    blog_post_tags: [],
  },
  {
    id: 3,
    slug: 'dental-bridge-options',
    title_he: 'אפשרויות גשרים דנטליים',
    title_ru: 'Варианты зубных мостов',
    excerpt_he: 'סוגי גשרים דנטליים שונים והתאמה אישית לכל מטופל',
    excerpt_ru: 'Различные типы зубных мостов',
    content_he: `<h1>אפשרויות גשרים דנטליים</h1>
<p>גשרים דנטליים הם פתרון מצוין להחלפת שיניים חסרות. במאמר זה נסביר על האפשרויות השונות.</p>
<h2>סוגי גשרים</h2>
<h3>גשרים קבועים</h3>
<p>גשרים המותקנים באופן קבוע ואינם ניתנים להסרה.</p>
<h3>גשרי זירקוניה</h3>
<p>גשרים חזקים ועמידים עם אסתטיקה מעולה.</p>
<h3>גשרים זמניים</h3>
<p>גשרים זמניים לתקופת הביניים.</p>`,
    content_ru: `
# Варианты зубных мостов

Зубные мосты - отличное решение для замены отсутствующих зубов.
    `,
    featured_image_url: '/images/dental/dental-work.jpg',
    published_at: new Date().toISOString(),
    published: true,
    blog_categories: {
      name_he: 'מידע',
      name_ru: 'Информация',
      slug: 'information',
    },
    blog_post_tags: [],
  },
];

export function getPostBySlug(slug: string): StaticBlogPost | null {
  return staticBlogPosts.find((post) => post.slug === slug && post.published) || null;
}

export function getAllPosts(): StaticBlogPost[] {
  return staticBlogPosts.filter((post) => post.published);
}
