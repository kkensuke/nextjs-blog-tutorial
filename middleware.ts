import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/owner')) {
    const token = request.cookies.get('owner_session');

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify the token
      await jwtVerify(token.value, key);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('owner_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/owner/:path*'
};