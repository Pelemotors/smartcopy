-- Add admin user to admin_users table
-- This script adds the user with ID 64d47ddc-16a1-4e83-a6d4-5d7ffa574d7e to admin_users

INSERT INTO public.admin_users (id, email, full_name, role, active)
VALUES (
  '64d47ddc-16a1-4e83-a6d4-5d7ffa574d7e',
  'lior@gmail.com',
  'מעבדת שיניים',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE
SET 
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  active = true;

