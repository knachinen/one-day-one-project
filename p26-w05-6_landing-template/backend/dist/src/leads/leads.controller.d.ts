import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
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
