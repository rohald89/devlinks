import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === 'production'
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
  });
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }
}

// Paths that require authentication
export const config = {
  matcher: ['/dashboard'],
};
