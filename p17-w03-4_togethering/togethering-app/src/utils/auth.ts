import { jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');

export async function getUserIdFromToken(token: string): Promise<string> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    if (typeof payload.userId === 'string') {
      return payload.userId;
    }
    throw new Error('Invalid token payload');
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
