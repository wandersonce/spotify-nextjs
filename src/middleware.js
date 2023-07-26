import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  //Token will exists if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //Allow the requests if the user is true
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  //Redirect to login if they don't match the previous check
  if (!token && pathname !== '/login') {
    req.nextUrl.pathname = '/login';
    // return redirect(307, '/login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Stop Middleware running on static files
export const config = { matcher: '/((?!.*\\.).*)' };
