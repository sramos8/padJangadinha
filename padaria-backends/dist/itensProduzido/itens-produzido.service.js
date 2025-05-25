"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItensProduzidoService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../supabase/supabase.client");
let ItensProduzidoService = class ItensProduzidoService {
    async create(item) {
        const { data: produzido, error } = await supabase_client_1.supabase
            .from('itens_produzido')
            .insert([item])
            .select()
            .single();
        if (error) {
            console.error('Erro ao cadastrar item produzido:', error);
            throw new common_1.InternalServerErrorException('Erro ao cadastrar item produzido');
        }
        const { data: estoqueExistente } = await supabase_client_1.supabase
            .from('estoque')
            .select('*')
            .eq('produto_id', item.produto_id)
            .single();
        if (estoqueExistente) {
            await supabase_client_1.supabase
                .from('estoque')
                .update({
                quantidade: estoqueExistente.quantidade + item.quantidade,
                unidade: item.unidade,
            })
                .eq('produto_id', item.produto_id);
        }
        else {
            await supabase_client_1.supabase
                .from('estoque')
                .insert({
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                unidade: item.unidade,
            });
        }
        const { data: produtoAtual } = await supabase_client_1.supabase
            .from('produtos')
            .select('quantidade')
            .eq('id', item.produto_id)
            .single();
        if (produtoAtual) {
            await supabase_client_1.supabase
                .from('produtos')
                .update({
                quantidade: produtoAtual.quantidade + item.quantidade,
            })
                .eq('id', item.produto_id);
        }
        return produzido;
    }
    async findAll() {
        const { data, error } = await supabase_client_1.supabase
            .from('itens_produzido')
            .select(`
        *,
        produtos (
          id,
          nome
        )
      `)
            .order('criado_em', { ascending: false });
        if (error) {
            console.error('Erro ao buscar itens produzidos:', error);
            throw new common_1.InternalServerErrorException('Erro ao buscar itens produzidos');
        }
        return data;
    }
    async update(id, itemAtualizado) {
        const { data: itemOriginal, error: erroBusca } = await supabase_client_1.supabase
            .from('itens_produzido')
            .select('*')
            .eq('id', id)
            .single();
        if (erroBusca || !itemOriginal) {
            console.error('Erro ao buscar item original:', erroBusca);
            throw new common_1.InternalServerErrorException('Item original não encontrado');
        }
        const diferenca = itemAtualizado.quantidade - itemOriginal.quantidade;
        const { data: itemAtualizadoFinal, error: erroUpdate } = await supabase_client_1.supabase
            .from('itens_produzido')
            .update({
            quantidade: itemAtualizado.quantidade,
            unidade: itemAtualizado.unidade || itemOriginal.unidade,
        })
            .eq('id', id)
            .select()
            .single();
        if (erroUpdate) {
            console.error('Erro ao atualizar item produzido:', erroUpdate);
            throw new common_1.InternalServerErrorException('Erro ao atualizar item produzido');
        }
        const { data: estoqueAtual } = await supabase_client_1.supabase
            .from('estoque')
            .select('*')
            .eq('produto_id', itemOriginal.produto_id)
            .single();
        if (estoqueAtual) {
            await supabase_client_1.supabase
                .from('estoque')
                .update({
                quantidade: estoqueAtual.quantidade + diferenca,
                unidade: itemAtualizado.unidade || estoqueAtual.unidade,
            })
                .eq('produto_id', itemOriginal.produto_id);
        }
        else {
            await supabase_client_1.supabase
                .from('estoque')
                .insert({
                produto_id: itemOriginal.produto_id,
                quantidade: itemAtualizado.quantidade,
                unidade: itemAtualizado.unidade || 'un',
            });
        }
        const { data: produtoAtual } = await supabase_client_1.supabase
            .from('produtos')
            .select('quantidade')
            .eq('id', itemOriginal.produto_id)
            .single();
        if (produtoAtual) {
            await supabase_client_1.supabase
                .from('produtos')
                .update({
                quantidade: produtoAtual.quantidade + diferenca,
            })
                .eq('id', itemOriginal.produto_id);
        }
        return itemAtualizadoFinal;
    }
    async remove(id) {
        const { data: itemOriginal, error: erroBusca } = await supabase_client_1.supabase
            .from('itens_produzido')
            .select('*')
            .eq('id', id)
            .single();
        if (erroBusca || !itemOriginal) {
            throw new common_1.InternalServerErrorException('Item produzido não encontrado para exclusão');
        }
        const { error: erroDelete } = await supabase_client_1.supabase
            .from('itens_produzido')
            .delete()
            .eq('id', id);
        if (erroDelete) {
            console.error('Erro ao excluir item produzido:', erroDelete);
            throw new common_1.InternalServerErrorException('Erro ao excluir item produzido');
        }
        const { data: estoqueAtual } = await supabase_client_1.supabase
            .from('estoque')
            .select('*')
            .eq('produto_id', itemOriginal.produto_id)
            .single();
        if (estoqueAtual) {
            await supabase_client_1.supabase
                .from('estoque')
                .update({
                quantidade: estoqueAtual.quantidade - itemOriginal.quantidade,
            })
                .eq('produto_id', itemOriginal.produto_id);
        }
        const { data: produtoAtual } = await supabase_client_1.supabase
            .from('produtos')
            .select('quantidade')
            .eq('id', itemOriginal.produto_id)
            .single();
        if (produtoAtual) {
            await supabase_client_1.supabase
                .from('produtos')
                .update({
                quantidade: produtoAtual.quantidade - itemOriginal.quantidade,
            })
                .eq('id', itemOriginal.produto_id);
        }
        return { message: 'Item removido com sucesso' };
    }
};
exports.ItensProduzidoService = ItensProduzidoService;
exports.ItensProduzidoService = ItensProduzidoService = __decorate([
    (0, common_1.Injectable)()
], ItensProduzidoService);
//# sourceMappingURL=itens-produzido.service.js.map