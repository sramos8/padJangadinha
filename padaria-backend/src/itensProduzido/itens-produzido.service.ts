import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class ItensProduzidoService {
  async create(item: { produto_id: string; quantidade: number; unidade: string; owner_id: string }) {
    const { data: produzido, error } = await supabase
      .from('itens_produzido')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar item produzido:', error);
      throw new InternalServerErrorException('Erro ao cadastrar item produzido');
    }

    // Atualizar estoque
    const { data: estoqueExistente } = await supabase
      .from('estoque')
      .select('*')
      .eq('produto_id', item.produto_id)
      .single();

    if (estoqueExistente) {
      await supabase
        .from('estoque')
        .update({
          quantidade: estoqueExistente.quantidade + item.quantidade,
          unidade: item.unidade,
          owner_id: item.owner_id,
        })
        .eq('produto_id', item.produto_id);
        console.log('Owner ID atualizado no estoque:', item.owner_id);
        console.log('Estoque existente', estoqueExistente);
        console.log('Estoque owner verificar', estoqueExistente.owner_id);
    } else {
      await supabase
        .from('estoque')
        .insert({
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          unidade: item.unidade,
          owner_id: item.owner_id,
        });
    }

    // Atualizar produto
    const { data: produtoAtual } = await supabase
      .from('produtos')
      .select('quantidade')
      .eq('id', item.produto_id)
      .single();

    if (produtoAtual) {
      await supabase
        .from('produtos')
        .update({
          quantidade: produtoAtual.quantidade + item.quantidade,
          owner_id: item.owner_id
        })
        .eq('id', item.produto_id);
    }

    return produzido;
  }

  async findAll() {
    const { data, error } = await supabase
      .from('itens_produzido')
      .select(`
        *,
        produtos (
          id,
          nome,
          owner_id,
        )
      `)
      .order('criado_em', { ascending: false });

    if (error) {
      console.error('Erro ao buscar itens produzidos:', error);
      throw new InternalServerErrorException('Erro ao buscar itens produzidos');
    }

    return data;
  }

  async update(id: string, itemAtualizado: { quantidade: number; unidade?: string; owner_id: string }) {
    // Buscar item original
    const { data: itemOriginal, error: erroBusca } = await supabase
      .from('itens_produzido')
      .select('*')
      .eq('id', id)
      .single();

    if (erroBusca || !itemOriginal) {
      console.error('Erro ao buscar item original:', erroBusca);
      throw new InternalServerErrorException('Item original não encontrado');
    }

    const diferenca = itemAtualizado.quantidade - itemOriginal.quantidade;

    // Atualizar item produzido
    const { data: itemAtualizadoFinal, error: erroUpdate } = await supabase
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
      throw new InternalServerErrorException('Erro ao atualizar item produzido');
    }

    // Atualizar estoque
    const { data: estoqueAtual } = await supabase
      .from('estoque')
      .select('*')
      .eq('produto_id', itemOriginal.produto_id)
      .single();

    if (estoqueAtual) {
      await supabase
        .from('estoque')
        .update({
          quantidade: estoqueAtual.quantidade + diferenca,
          unidade: itemAtualizado.unidade || estoqueAtual.unidade,
          owner_id: itemAtualizado.owner_id,
        })
        .eq('produto_id', itemOriginal.produto_id);
    } else {
      // Cria novo estoque se não existir
      await supabase
        .from('estoque')
        .insert({
          produto_id: itemOriginal.produto_id,
          quantidade: itemAtualizado.quantidade,
          unidade: itemAtualizado.unidade || 'un',
          owner_id: itemAtualizado.owner_id,
        });
    }

    // Atualizar produto
    const { data: produtoAtual } = await supabase
      .from('produtos')
      .select('quantidade')
      .eq('id', itemOriginal.produto_id)
      .single();

    if (produtoAtual) {
      await supabase
        .from('produtos')
        .update({
          quantidade: produtoAtual.quantidade + diferenca,
        })
        .eq('id', itemOriginal.produto_id);
    }

    return itemAtualizadoFinal;
  }

  async remove(id: string, owner_id: string) {
    // Buscar item original
    const { data: itemOriginal, error: erroBusca } = await supabase
      .from('itens_produzido')
      .select('*')
      .eq('id', id)
      .single();

    if (erroBusca || !itemOriginal) {
      throw new InternalServerErrorException('Item produzido não encontrado para exclusão');
    }

    // Remover item
    const { error: erroDelete } = await supabase
      .from('itens_produzido')
      .delete()
      .eq('id', id);

    if (erroDelete) {
      console.error('Erro ao excluir item produzido:', erroDelete);
      throw new InternalServerErrorException('Erro ao excluir item produzido');
    }

    // Atualizar estoque
    const { data: estoqueAtual } = await supabase
      .from('estoque')
      .select('*')
      .eq('produto_id', itemOriginal.produto_id)
      .single();

    if (estoqueAtual) {
      await supabase
        .from('estoque')
        .update({
          quantidade: estoqueAtual.quantidade - itemOriginal.quantidade,
          owner_id: owner_id,
        })
        .eq('produto_id', itemOriginal.produto_id);
    }

    // Atualizar produto
    const { data: produtoAtual } = await supabase
      .from('produtos')
      .select('quantidade')
      .eq('id', itemOriginal.produto_id)
      .single();

    if (produtoAtual) {
      await supabase
        .from('produtos')
        .update({
          quantidade: produtoAtual.quantidade - itemOriginal.quantidade,
        })
        .eq('id', itemOriginal.produto_id);
    }

    return { message: 'Item removido com sucesso' };
  }
}
