import { Venda } from '../vendas/venda.entity';
export declare class Produto {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    vendas: Venda[];
}
