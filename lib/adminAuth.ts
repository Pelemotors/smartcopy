import { ADMIN_CONFIG, SESSION_SECRET, SESSION_DURATION } from './adminConfig';
import { SignJWT, jwtVerify } from 'jose';

// Generate a session token
export async function createSessionToken(userId: string, username: string) {
  const secret = new TextEncoder().encode(SESSION_SECRET);
  
  const token = await new SignJWT({ userId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_DURATION)
    .sign(secret);

  return token;
}

// Verify session token
export async function verifySessionToken(token: string): Promise<{ userId: string; username: string } | null> {
  try {
    const secret = new TextEncoder().encode(SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      userId: payload.userId as string,
      username: payload.username as string,
    };
  } catch (error) {
    return null;
  }
}

// Verify credentials
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Check username
  if (username !== ADMIN_CONFIG.username) {
    return false;
  }

  // For simplicity, we'll do direct comparison
  // In production, use bcrypt.compare with hashed password
  if (password === ADMIN_CONFIG.password) {
    return true;
  }

  // If we had a hashed password, we would do:
  // return await bcrypt.compare(password, PASSWORD_HASH);
  return false;
}

// Get admin user info
export function getAdminUser() {
  return {
    id: ADMIN_CONFIG.id,
    username: ADMIN_CONFIG.username,
    name: ADMIN_CONFIG.name,
  };
}

