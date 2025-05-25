"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutosService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../supabase/supabase.client");
let ProdutosService = class ProdutosService {
    async findAll() {
        const { data, error } = await supabase_client_1.supabase.from('produtos').select('*');
        if (error)
            throw error;
        return data;
    }
    async create(produto) {
        const { data, error } = await supabase_client_1.supabase.from('produtos').insert([produto]).select();
        if (error)
            throw error;
        return data[0];
    }
    async update(id, produto) {
        const { data, error } = await supabase_client_1.supabase.from('produtos').update(produto).eq('id', id).select();
        if (error)
            throw error;
        return data[0];
    }
    async remove(id) {
        const { error } = await supabase_client_1.supabase.from('produtos').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Produto removido com sucesso' };
    }
};
exports.ProdutosService = ProdutosService;
exports.ProdutosService = ProdutosService = __decorate([
    (0, common_1.Injectable)()
], ProdutosService);
//# sourceMappingURL=produtos.service.js.map