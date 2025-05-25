import { ProdutosService } from './produtos.service';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    findAll(): Promise<any[]>;
    create(body: {
        nome: string;
        preco: number;
        quantidade: number;
    }): Promise<any>;
    update(id: string, body: Partial<{
        nome: string;
        preco: number;
        quantidade: number;
    }>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
