/* import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { Produto } from '../produtos/produto.entity';
import { CreateVendaDto } from './dto/create-venda.dto';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private vendasRepo: Repository<Venda>,
    @InjectRepository(Produto)
    private produtosRepo: Repository<Produto>,
  ) {}

  async create(dto: CreateVendaDto): Promise<Venda> {
    const produto = await this.produtosRepo.findOne({ where: { id: dto.produtoId } });
    if (!produto) throw new NotFoundException('Produto não encontrado');

    if (produto.quantidade < dto.quantidade) {
      throw new BadRequestException('Quantidade insuficiente em estoque');
    }

    produto.quantidade -= dto.quantidade;
    await this.produtosRepo.save(produto);

    const venda = this.vendasRepo.create({ quantidade: dto.quantidade, produto });
    return this.vendasRepo.save(venda);
  }

  findAll(): Promise<Venda[]> {
    return this.vendasRepo.find({ relations: ['produto'], order: { data: 'DESC' } });
  }
}
 */
// src/vendas/vendas.service.ts
import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class VendasService {
  async findAll() {
    const { data, error } = await supabase.from('vendas').select('*');
    if (error) throw error;
    return data;
  }

  async create(venda: { produto_id: string; quantidade: number }) {
  // Busca o produto para pegar o preço
  const { data: produto, error: produtoError } = await supabase
    .from('produtos')
    .select('preco')
    .eq('id', venda.produto_id)
    .single();

  if (produtoError) throw produtoError;

  const total = produto.preco * venda.quantidade;

  const { data, error } = await supabase
    .from('vendas')
    .insert([{ ...venda, total }])
    .select();

  if (error) throw error;

  return data[0];
}

  async update(id: string, venda: Partial<{ produto_id: string; quantidade: number; total: number }>) {
    const { data, error } = await supabase.from('vendas').update(venda).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await supabase.from('vendas').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Venda removida com sucesso' };
  }
}