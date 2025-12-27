import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLeadDto: CreateLeadDto): Promise<{
        name: string;
        email: string;
        phone: string | null;
        message: string | null;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        phone: string | null;
        message: string | null;
        createdAt: Date;
        id: number;
    }[]>;
}
