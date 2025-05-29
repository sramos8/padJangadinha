// src/relatorio/relatorio.service.ts
import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class RelatorioService {
  async getResumo(userId: string) {
    const { data: vendasData, error: vendasError } = await supabase
      .from('vendas')
      .select('total') // renomeando para 'valor' para manter consistência
      .eq('owner_id', userId);

    if (vendasError) throw vendasError;

    const totalVendas = vendasData?.reduce((acc, venda) => acc + venda.total, 0) || 0;

    const { data: produtosData, error: produtosError } = await supabase
      .from('produtos')
      .select('id') // não precisa de tudo
      .eq('owner_id', userId);

    if (produtosError) throw produtosError;

    const totalProdutos = produtosData?.length || 0;

    const { data: estoqueData, error: estoqueError } = await supabase
      .from('estoque')
      .select('quantidade')
      .eq('owner_id', userId);

    if (estoqueError) throw estoqueError;

    const totalEstoque = estoqueData?.reduce((acc, item) => acc + item.quantidade, 0) || 0;

    return {
      totalVendas,
      totalProdutos,
      totalEstoque,
    };
  }
}
