"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendasService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../supabase/supabase.client");
let VendasService = class VendasService {
    async findAll() {
        const { data, error } = await supabase_client_1.supabase.from('vendas').select('*');
        if (error)
            throw error;
        return data;
    }
    async create(venda) {
        const { data: produto, error: produtoError } = await supabase_client_1.supabase
            .from('produtos')
            .select('preco')
            .eq('id', venda.produto_id)
            .single();
        if (produtoError)
            throw produtoError;
        const total = produto.preco * venda.quantidade;
        const { data, error } = await supabase_client_1.supabase
            .from('vendas')
            .insert([{ ...venda, total }])
            .select();
        if (error)
            throw error;
        return data[0];
    }
    async update(id, venda) {
        const { data, error } = await supabase_client_1.supabase.from('vendas').update(venda).eq('id', id).select();
        if (error)
            throw error;
        return data[0];
    }
    async remove(id) {
        const { error } = await supabase_client_1.supabase.from('vendas').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Venda removida com sucesso' };
    }
};
exports.VendasService = VendasService;
exports.VendasService = VendasService = __decorate([
    (0, common_1.Injectable)()
], VendasService);
//# sourceMappingURL=vendas.service.js.map