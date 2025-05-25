import { Controller, Post, Body, Get, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { ItensProduzidoService } from './itens-produzido.service';
import { supabase } from '../supabase/supabase.client';


@Controller('itens-produzidos')
export class ItensProduzidoController {
  constructor(private readonly service: ItensProduzidoService) {}

 @Post()
  async create(@Body() data: { produto_id: string; quantidade: number; unidade: string }) {
    if (!data.produto_id || !data.quantidade || !data.unidade) {
      throw new BadRequestException('Campos obrigatórios: produto_id, quantidade, unidade');
    }
    console.log('Dados recebidos:', data);

    // Busca o produto para validar e recuperar o nome
    const { data: produto, error } = await supabase
      .from('produtos')
      .select('nome')
      .eq('id', data.produto_id)
      .single();

    if (error || !produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    // Passa os dados para o service com nome do produto
    return this.service.create({
    produto_id: data.produto_id,
    quantidade: data.quantidade,
    unidade: data.unidade,
    });

  }


  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { produto_id: string; quantidade: number; unidade: string }) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

}
