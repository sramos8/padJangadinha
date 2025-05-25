export declare class ProdutosService {
    findAll(): Promise<any[]>;
    create(produto: {
        nome: string;
        preco: number;
        quantidade: number;
    }): Promise<any>;
    update(id: string, produto: Partial<{
        nome: string;
        preco: number;
        quantidade: number;
    }>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
