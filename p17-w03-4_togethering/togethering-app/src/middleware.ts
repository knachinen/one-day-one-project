import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Define public paths that do not require authentication
const publicPaths = ['/api/auth/register', '/api/auth/login', '/login', '/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If the path is public, allow the request to proceed
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Get the token from the cookie
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // If no token, redirect to login or return unauthorized
    // For API routes, return 401 Unauthorized
    if (path.startsWith('/api')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // For page routes, redirect to login (example: '/login')
    // return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // For now, treat all as API-like for simplicity
  }

  try {
    // Verify the token
    jwt.verify(token, JWT_SECRET);
    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // Token is invalid
    if (path.startsWith('/api')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // For page routes, redirect to login
    // return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // For now, treat all as API-like for simplicity
  }
}

// Specify the paths the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Exclude static assets and favicon
};
