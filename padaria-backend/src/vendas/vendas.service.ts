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
import { Injectable, BadRequestException } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class VendasService {
  async findAll() {
    const { data, error } = await supabase
      .from('vendas')
      .select('id, produto_id, quantidade, total, created_at, owner_id, users!fk_owner(nome)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    console.log('Vendas:', data);
    return data;
  }

  async create(venda: { produto_id: string; quantidade: number; owner_id: string }) {
    // 1. Buscar produto e validar quantidade
    const { data: produto, error: produtoError } = await supabase
      .from('produtos')
      .select('id, preco, quantidade')
      .eq('id', venda.produto_id)
      .single();

    if (produtoError) throw produtoError;

    if (!produto) throw new BadRequestException('Produto não encontrado');

    if (produto.quantidade < venda.quantidade) {
      throw new BadRequestException('Quantidade insuficiente em estoque');
    }

    const total = produto.preco * venda.quantidade;

    // 2. Inserir venda com total e owner
    const { data: vendaData, error: vendaError } = await supabase
      .from('vendas')
      .insert([{ ...venda, total }])
      .select();

    if (vendaError) throw vendaError;

    // 3. Atualizar estoque
    const novaQuantidade = produto.quantidade - venda.quantidade;

    const { error: estoqueError } = await supabase
      .from('produtos')
      .update({ quantidade: novaQuantidade })
      .eq('id', venda.produto_id);

    if (estoqueError) throw estoqueError;

    return vendaData[0];
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
