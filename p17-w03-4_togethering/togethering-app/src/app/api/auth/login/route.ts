import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
console.log('Login Route JWT_SECRET (key generated):', new TextDecoder().decode(JWT_SECRET_KEY));

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(JWT_SECRET_KEY);

    const serializedCookie = serialize('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200, headers: { 'Set-Cookie': serializedCookie } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
