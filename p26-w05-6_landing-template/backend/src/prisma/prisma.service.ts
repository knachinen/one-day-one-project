import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // Prisma 7 handles config via prisma.config.ts for CLI, 
      // but for runtime we can pass it here if needed, 
      // although it should pick it up if configured correctly.
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}