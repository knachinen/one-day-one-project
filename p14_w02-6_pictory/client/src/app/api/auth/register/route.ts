import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import initializeDataSource from '@/lib/typeorm/config/data-source';
import { User } from '@/lib/typeorm/entities/User';

export async function POST(req: NextRequest) {
  const { email, password, nickname } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const AppDataSource = await initializeDataSource();
    const userRepository = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = userRepository.create({
      email,
      password_hash,
      nickname,
      provider: 'local', // Default to local provider
    });
    await userRepository.save(newUser);

    // Omit password_hash from the response for security
    const { password_hash: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ message: 'User registered successfully.', user: userWithoutPassword }, { status: 201 });
  } catch (error: any) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error.', error: error.message }, { status: 500 });
  }
}
