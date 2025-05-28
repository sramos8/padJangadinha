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

  private extrairUserId(req: Request): string {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token de autenticação ausente');
    }

    try {
      const decoded = jwt.decode(token) as { sub: string };
      const userId = decoded?.sub;
      if (!userId) throw new Error();
      return userId;
    } catch {
      throw new BadRequestException('Token inválido');
    }
  }

  @Post()
  async create(
    @Body() data: { produto_id: string; quantidade: number; unidade: string },
    @Req() req: Request
  ) {
    if (!data.produto_id || !data.quantidade || !data.unidade) {
      throw new BadRequestException('Campos obrigatórios: produto_id, quantidade, unidade');
    }

    const userId = this.extrairUserId(req);

    const { data: produto, error } = await supabase
      .from('produtos')
      .select('nome')
      .eq('id', data.produto_id)
      .single();

    if (error || !produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    return this.service.create({
      ...data,
      owner_id: userId,
    });
  }

  @Get()
  async findAll() {
    const { data, error } = await supabase
      .from('itens_produzido')
      .select('id, produto_id, quantidade, unidade, criado_em, produtos(nome), owner:owner_id(nome)')
      .order('criado_em', { ascending: false });

    if (error) {
      throw new BadRequestException('Erro ao buscar itens produzidos');
    }

    return data;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { quantidade: number; unidade?: string },
    @Req() req: Request
  ) {
    if (!data.quantidade) {
      throw new BadRequestException('Campo quantidade é obrigatório');
    }

    const userId = this.extrairUserId(req);

    return this.service.update(id, {
      ...data,
      owner_id: userId,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = this.extrairUserId(req);
    return this.service.remove(id, userId);
  }
}
