import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }
}

// Paths that require authentication
export const config = {
  matcher: ['/dashboard'],
};
