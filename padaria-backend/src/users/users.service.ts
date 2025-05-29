/* import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ id: 1, email: 'admin@padaria.com', senha: '1234', username: 'admin', nome: 'Admin' }];

  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
} */

import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class UsersService {
  async findAll() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  }

  async create(user: { nome: string; email: string; senha: string; username: string; role?: string }) {
  const { data, error } = await supabase.from('users').insert([
    {
      ...user,
      role: user.role || 'user', // Define 'user' como padrão se não vier do front
    },
  ]).select();

  if (error) throw error;
  return data[0];
}

async update(id: string, user: Partial<{ nome: string; email: string; senha: string; username: string; role: string }>) {
  const { data, error } = await supabase.from('users').update(user).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

  async remove(id: string) {
    if (!id) throw new Error('ID do usuário é obrigatório');

    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;

    return { message: 'Usuário removido com sucesso' };
  }
  async getResumoUsuarios() {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return { total: count || 0 };
  }
}
