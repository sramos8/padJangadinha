export declare class ItensProduzidoService {
    create(item: {
        produto_id: string;
        quantidade: number;
        unidade: string;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, itemAtualizado: {
        quantidade: number;
        unidade?: string;
    }): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
