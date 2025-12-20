'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement Supabase Auth login
      // For now, this is a placeholder
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success - redirect to dashboard
        router.push('/admin/dashboard');
        router.refresh(); // Refresh to update middleware
      } else {
        const data = await response.json();
        setError(data.error || 'שגיאה בהתחברות');
      }
    } catch (error) {
      setError('שגיאה בהתחברות. נסי שוב מאוחר יותר.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-cream">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-3xl font-heading font-bold text-text-dark mb-8 text-center">
            התחברות מנהל
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="אימייל"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
            />

            <Input
              label="סיסמה"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  מתחבר...
                </span>
              ) : (
                'התחברי'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

