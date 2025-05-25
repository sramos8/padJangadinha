import { ItensProduzidoService } from './itens-produzido.service';
export declare class ItensProduzidoController {
    private readonly service;
    constructor(service: ItensProduzidoService);
    create(data: {
        produto_id: string;
        quantidade: number;
        unidade: string;
    }): Promise<any>;
    findAll(): Promise<any[]>;
    update(id: string, data: {
        produto_id: string;
        quantidade: number;
        unidade: string;
    }): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
