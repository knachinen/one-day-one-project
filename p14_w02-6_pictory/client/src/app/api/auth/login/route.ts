import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import initializeDataSource from '@/lib/typeorm/config/data-source';
import { User } from '@/lib/typeorm/entities/User';

// Define a JWT Secret key. In a real application, this should be a strong,
// randomly generated string stored securely in environment variables.
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // TODO: Store securely in .env.local

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const AppDataSource = await initializeDataSource();
    const userRepository = AppDataSource.getRepository(User);

    // Find user by email
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Omit password_hash from the response for security
    const { password_hash: _, ...userWithoutPassword } = user;

    return NextResponse.json({ message: 'Login successful.', token, user: userWithoutPassword }, { status: 200 });
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}
