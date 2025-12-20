export interface QuizAnswer {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  answers: QuizAnswer[];
  isInformational?: boolean; // שאלה 1 היא אינפורמטיבית בלבד
}

export interface QuizResult {
  tier: 1 | 2 | 3;
  title: string;
  summary: string;
  whatsappMessage: string;
  ctaText: {
    whatsapp: string;
    call: string;
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'איזה שירות אתם מחפשים?',
    isInformational: true,
    answers: [
      { text: 'תותבות שיניים', score: 0 },
      { text: 'כתרים', score: 0 },
      { text: 'גשרים', score: 0 },
      { text: 'תיקון/שיפוץ', score: 0 },
      { text: 'שירות אחר', score: 0 },
    ],
  },
  {
    id: 2,
    text: 'מה מצב השיניים הנוכחי שלכם?',
    answers: [
      { text: 'שיניים בריאות, רק צורך בשיקום אסתטי', score: 0 },
      { text: 'יש כמה שיניים חסרות או פגומות', score: 1 },
      { text: 'יש בעיות משמעותיות - כמה שיניים חסרות או שבורות', score: 2 },
      { text: 'מצב מורכב - הרבה שיניים חסרות או בעיות רבות', score: 3 },
    ],
  },
  {
    id: 3,
    text: 'כמה זמן אתם מתמודדים עם הבעיה?',
    answers: [
      { text: 'רק התחיל - בעיה חדשה', score: 1 },
      { text: 'כמה חודשים', score: 2 },
      { text: 'יותר משנה', score: 2 },
      { text: 'שנים רבות', score: 3 },
    ],
  },
  {
    id: 4,
    text: 'איך הבעיה משפיעה עליכם ביום-יום?',
    answers: [
      { text: 'לא ממש משפיעה, רק אסתטיקה', score: 0 },
      { text: 'משפיעה קצת - קושי באכילה או דיבור', score: 1 },
      { text: 'משפיעה משמעותית - קושי רב באכילה, ביטחון עצמי נמוך', score: 2 },
      { text: 'משפיעה מאוד - פגיעה משמעותית באיכות החיים', score: 3 },
    ],
  },
  {
    id: 5,
    text: 'האם יש לכם ניסיון קודם עם טכנאי שיניים?',
    answers: [
      { text: 'כן, יש לי טכנאי קבוע', score: 0 },
      { text: 'כן, אבל לא מרוצה מהשירות', score: 2 },
      { text: 'כן, אבל מחפש משהו אחר', score: 1 },
      { text: 'לא, זו הפעם הראשונה', score: 1 },
    ],
  },
  {
    id: 6,
    text: 'מה רמת הדחיפות של הטיפול?',
    answers: [
      { text: 'לא דחוף - רק בודק אפשרויות', score: 0 },
      { text: 'בינוני - רוצה לטפל בקרוב', score: 1 },
      { text: 'דחוף - צריך לטפל בהקדם', score: 2 },
      { text: 'דחוף מאוד - בעיה שמפריעה מאוד', score: 3 },
    ],
  },
  {
    id: 7,
    text: 'עד כמה אתם מוכנים להתחיל תהליך שיקום?',
    answers: [
      { text: 'רק בודקים, לא בטוחים אם עכשיו הזמן', score: 0 },
      { text: 'מוכנים לשינוי קטן, לא משהו מורכב', score: 1 },
      { text: 'מאוד רוצים שינוי, מוכנים להיות מחויבים לתהליך', score: 2 },
      { text: 'חייבים שינוי, מוכנים להשקיע זמן וכסף', score: 3 },
    ],
  },
];

export const quizResults: Record<1 | 2 | 3, QuizResult> = {
  1: {
    tier: 1,
    title: '✨ יש לכם צורך בסיסי – נוכל לעזור בקלות',
    summary: 'המצב שלכם נראה יחסית פשוט. נוכל לספק לכם שירות מקצועי ואיכותי שיענה על הצרכים שלכם בצורה מהירה ויעילה.',
    whatsappMessage: 'שלום, עשיתי את ההערכה באתר. יש לי צורך בסיסי בשירותי שיניים. אשמח לשיחה.',
    ctaText: {
      whatsapp: 'וואטסאפ לשאלה קצרה',
      call: 'קביעת שיחת ייעוץ',
    },
  },
  2: {
    tier: 2,
    title: '🦷 יש לכם צורך בינוני – תהליך מסודר יעזור',
    summary: 'נראה שיש לכם צורך משמעותי בשיקום שיניים. תהליך מסודר ומקצועי יעזור לכם להשיג את התוצאה הרצויה.',
    whatsappMessage: 'שלום, עשיתי את ההערכה באתר. יש לי צורך בשירותי שיניים. אשמח לשמוע עוד על התהליך.',
    ctaText: {
      whatsapp: 'וואטסאפ – אשמח לשמוע פרטים',
      call: 'לקביעת שיחת היכרות',
    },
  },
  3: {
    tier: 3,
    title: '💎 יש לכם צורך מורכב – ליווי מקצועי יעשה הבדל',
    summary: 'המצב מצביע על צורך מורכב יותר. ליווי מקצועי ומותאם אישית יעזור לכם להשיג את התוצאה הטובה ביותר.',
    whatsappMessage: 'שלום, עשיתי את ההערכה באתר ונראה שיש לי צורך מורכב בשירותי שיניים. אשמח לשיחת היכרות.',
    ctaText: {
      whatsapp: 'שליחת הודעה בוואטסאפ',
      call: 'שיחת היכרות ללא התחייבות',
    },
  },
};

export function calculateTier(score: number): 1 | 2 | 3 {
  if (score >= 0 && score <= 5) return 1;
  if (score >= 6 && score <= 12) return 2;
  return 3;
}

