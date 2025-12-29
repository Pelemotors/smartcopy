import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for session token (simple check - full verification in API routes)
    const sessionToken = request.cookies.get('admin-session')?.value;
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token exists - let API routes do full verification
    // This is just a basic check to prevent unauthorized access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

