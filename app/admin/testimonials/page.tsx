
import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabaseServer } from '@/lib/supabaseServerClient';

export const metadata: Metadata = {
  title: 'ניהול המלצות - מנהל',
  description: 'ניהול המלצות',
};

async function getTestimonials() {
  const { data, error } = await supabaseServer
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-text-dark">
          ניהול המלצות
        </h1>
        {/* לעתיד: קישור לעמוד יצירת המלצה חדשה */}
        <Button variant="primary" size="md" disabled>
          המלצה חדשה (בקרוב)
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border-2 border-accent-sky bg-white">
            <option value="">כל ההמלצות</option>
            <option value="featured">מומלצות</option>
            <option value="not-featured">לא מומלצות</option>
          </select>
        </div>
      </Card>

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-dark/60 font-body mb-4">
            אין המלצות עדיין
          </p>
          <Button variant="primary" size="md" disabled>
            הוסיפי המלצה ראשונה
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-accent-sky/20">
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    שם
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    גיל הילד
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    דירוג
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    מומלץ
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    תאריך
                  </th>
                  <th className="text-right py-4 px-4 font-heading font-semibold text-text-dark">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="border-b border-accent-sky/10 hover:bg-accent-sky/5"
                  >
                    <td className="py-4 px-4 font-body text-text-dark">
                      {testimonial.name}
                    </td>
                    <td className="py-4 px-4 font-body text-text-dark">
                      {testimonial.child_age || '-'}
                    </td>
                    <td className="py-4 px-4">
                      {Array.from({ length: testimonial.rating || 0 }).map(
                        (_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ),
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {testimonial.featured ? (
                        <span className="text-green-600 font-body">כן</span>
                      ) : (
                        <span className="text-gray-500 font-body">לא</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-body text-text-dark">
                      {testimonial.created_at
                        ? new Date(
                            testimonial.created_at as string,
                          ).toLocaleDateString('he-IL')
                        : '-'}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-accent-sky hover:text-accent-lavender font-body">
                        עריכה
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
