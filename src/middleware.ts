import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In a real app, this would use Supabase Auth to check session and role
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths
  const isProtectedRoute = 
    pathname.startsWith('/my') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/partner') || 
    pathname.startsWith('/manufacturer');

  // Skip actual logic for now as we use mockUser in components
  // Real implementation would look like:
  /*
  const session = await getSupabaseSession();
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (session && pathname.startsWith('/admin') && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my/:path*',
    '/admin/:path*',
    '/partner/:path*',
    '/manufacturer/:path*',
  ],
};