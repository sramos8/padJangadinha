import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class EstoqueService {
async findAll() {
  const { data, error } = await supabase
    .from('produtos')
    .select('id, nome, preco, quantidade, owner_id, users!produtos_owner_id_fkey(nome)')
    .order('nome');

  if (error) throw error;
  return data;
}
  async create(item: { produto_id: string; quantidade: number; unidade: string; owner_id: string }) {
    const { data, error } = await supabase.from('estoque').insert([item]).select();
    if (error) throw error;
    return data[0];
  }

  async update(id: string, item: Partial<{ produto_id: string; quantidade: number; unidade: string }>) {
    const { data, error } = await supabase.from('estoque').update(item).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await supabase.from('estoque').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Item de estoque removido com sucesso' };
  }
}
