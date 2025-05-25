export declare class VendasService {
    findAll(): Promise<any[]>;
    create(venda: {
        produto_id: string;
        quantidade: number;
    }): Promise<any>;
    update(id: string, venda: Partial<{
        produto_id: string;
        quantidade: number;
        total: number;
    }>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
