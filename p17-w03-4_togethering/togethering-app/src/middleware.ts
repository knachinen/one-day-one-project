import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
console.log('Middleware JWT_SECRET (key generated):', new TextDecoder().decode(JWT_SECRET_KEY)); // Log the key for debugging

// Define public paths that do not require authentication
const publicPaths = ['/', '/dashboard', '/api/auth/register', '/api/auth/login', '/login', '/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware Path:', path, 'Is Public:', publicPaths.includes(path));

  // If the path is public, allow the request to proceed
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Get the token from the cookie
  const cookieHeader = request.headers.get('Cookie');
  console.log('Middleware - Cookie Header:', cookieHeader);
  const token = request.cookies.get('token')?.value;
  console.log('Middleware - Extracted Token:', token);

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
    await jwtVerify(token, JWT_SECRET_KEY); // Use await with jwtVerify from jose
    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware - JWT Verification Error:', error); // Log the JWT verification error
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