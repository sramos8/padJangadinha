export declare class EstoqueService {
    findAll(): Promise<any[]>;
    update(id: string, estoque: Partial<{
        quantidade: number;
    }>): Promise<any>;
}
