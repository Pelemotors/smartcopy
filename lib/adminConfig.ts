// Admin configuration - hardcoded for simplicity
// In production, consider using environment variables

export const ADMIN_CONFIG = {
  username: 'sarit',
  password: 'Sarit123!', // In production, this should be hashed
  id: 'admin-1',
  name: 'שרית הדר',
};

// Simple session secret (in production, use a strong random secret from env)
export const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'your-secret-key-change-in-production';

// Session duration (7 days)
export const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

