import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class EstoqueService {
  async findAll() {
    const { data, error } = await supabase.from('estoque').select('*');
    if (error) throw error;
    return data;
  }

  async update(id: string, estoque: Partial<{ quantidade: number }>) {
    const { data, error } = await supabase.from('estoque').update(estoque).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }
}