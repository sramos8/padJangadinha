import { EstoqueService } from './estoque.service';
export declare class EstoqueController {
    private readonly estoqueService;
    constructor(estoqueService: EstoqueService);
    findAll(): Promise<any[]>;
    update(id: string, body: Partial<{
        quantidade: number;
    }>): Promise<any>;
}
