import { Produto } from '../produtos/produto.entity';
export declare class Venda {
    id: number;
    quantidade: number;
    data: Date;
    produto: Produto;
}
