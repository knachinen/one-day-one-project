import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL); // Debugging line
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
