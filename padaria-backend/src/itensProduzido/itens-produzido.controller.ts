import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ItensProduzidoService } from './itens-produzido.service';
import { supabase } from '../supabase/supabase.client';
import * as jwt from 'jsonwebtoken';

@Controller('itens-produzidos')
export class ItensProduzidoController {
  constructor(private readonly service: ItensProduzidoService) {}

  @Post()
  async create(
    @Body() data: { produto_id: string; quantidade: number; unidade: string },
    @Req() req: Request
  ) {
    if (!data.produto_id || !data.quantidade || !data.unidade) {
      throw new BadRequestException('Campos obrigatórios: produto_id, quantidade, unidade');
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token de autenticação ausente');
    }

    // ⚠️ Decodificação simples — para produção, use jwt.verify e configure chave secreta
    let userId: string;
    try {
      const decoded = jwt.decode(token) as { sub: string };
      userId = decoded?.sub;
      if (!userId) throw new Error();
    } catch {
      throw new BadRequestException('Token inválido');
    }

    // Verifica se o produto existe
    const { data: produto, error } = await supabase
      .from('produtos')
      .select('nome')
      .eq('id', data.produto_id)
      .single();

    if (error || !produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    return this.service.create({
      produto_id: data.produto_id,
      quantidade: data.quantidade,
      unidade: data.unidade,
      owner_id: userId, // 👈 owner_id agora vem do token
    });
  }

  @Get()
  async findAll() {
      const { data, error } = await supabase
        .from('itens_produzido')
        .select('id, produto_id, quantidade, unidade, criado_em, produtos(nome), owner:owner_id(nome)')
        .order('criado_em', { ascending: false });

      if (error) {
        throw new Error('Erro ao buscar itens produzidos');
      }

      return data;
    }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { produto_id: string; quantidade: number; unidade: string }
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
