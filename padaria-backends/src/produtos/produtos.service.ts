import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class ProdutosService {
  async findAll() {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) throw error;
    return data;
  }

  async create(produto: { nome: string; preco: number; quantidade: number }) {
    const { data, error } = await supabase.from('produtos').insert([produto]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id: string, produto: Partial<{ nome: string; preco: number; quantidade: number }>) {
    const { data, error } = await supabase.from('produtos').update(produto).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Produto removido com sucesso' };
  }
}