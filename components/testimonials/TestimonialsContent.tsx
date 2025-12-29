'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { mockTestimonials } from '@/lib/mockData';

export function TestimonialsContent() {
  // Use mock data when Supabase is not connected
  const testimonials = mockTestimonials.filter((t) => t.is_featured);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 tracking-tight">
          לקוחות מספרים
        </h1>
        <p className="text-lg md:text-xl text-text-medium font-body max-w-3xl mx-auto">
          מילים של לקוחות אחרי שהמסר התחדד והכול נהיה ברור יותר.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card 
            key={testimonial.id} 
            className="border-2 border-accent-lavender/20 bg-gradient-to-br from-white to-accent-lavender/5 hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="mb-4">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            </div>
            <p className="text-text-medium font-body text-lg leading-relaxed mb-4">
              &quot;{testimonial.text_he}&quot;
            </p>
            <div className="text-primary font-heading font-semibold">
              {testimonial.name_he}
              {testimonial.business_type && ` - ${testimonial.business_type}`}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 md:mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="text-text-medium font-body text-lg md:text-xl mb-6">
          רוצה תוצאה דומה? נתחיל מנקודה אחת קטנה שעושה סדר.
        </p>
        <Button variant="primary" size="lg" asChild className="hover-lift">
          <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">
            לוואטסאפ
          </a>
        </Button>
      </div>
    </div>
  );
}

