import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Ensure JWT_SECRET_KEY is properly loaded
const getSecretKey = () => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    console.error('JWT_SECRET_KEY environment variable is not set!');
    // In production, you might want to throw an error here
    // to prevent the application from starting with insecure settings
  }
  return new TextEncoder().encode(secretKey || '');
};

export async function middleware(request: NextRequest) {
  // Only apply middleware to owner routes
  if (request.nextUrl.pathname.startsWith('/owner')) {
    const token = request.cookies.get('owner_session');

    // Redirect to login if no token found
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token
      await jwtVerify(token.value, getSecretKey());
      return NextResponse.next();
    } catch (error) {
      // Log the specific error for debugging
      console.error('Token verification failed:', 
        error instanceof Error ? error.message : 'Unknown error');
      
      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('owner_session');
      return response;
    }
  }

  // For non-owner routes, continue
  return NextResponse.next();
}

export const config = {
  matcher: '/owner/:path*'
};