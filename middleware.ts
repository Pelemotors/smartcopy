import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for access token
    const accessToken = request.cookies.get('sb-access-token')?.value;
    
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token exists - let the API routes verify it
    // We'll do full verification in API routes for security
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

