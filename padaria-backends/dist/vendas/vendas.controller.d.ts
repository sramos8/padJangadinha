import { VendasService } from './vendas.service';
export declare class VendasController {
    private readonly vendasService;
    constructor(vendasService: VendasService);
    findAll(): Promise<any[]>;
    create(body: {
        produto_id: string;
        quantidade: number;
        total: number;
    }): Promise<any>;
    update(id: string, body: Partial<{
        produto_id: string;
        quantidade: number;
        total: number;
    }>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
