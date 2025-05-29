/* import { Controller, Post, Body, Get } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  create(@Body() dto: CreateVendaDto) {
    return this.vendasService.create(dto);
  }

  @Get()
  findAll() {
    return this.vendasService.findAll();
  }
} */
// src/vendas/vendas.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import * as jwt from 'jsonwebtoken';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

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


  @Get()
  findAll() {
    return this.vendasService.findAll();
  }

  @Post()
async create(@Body() body, @Req() req: Request) {
  const userId = this.extrairUserId(req);
  const payload = {
    ...body,
    owner_id: userId,
  };
  return this.vendasService.create(payload);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ produto_id: string; quantidade: number; total: number }>) {
    return this.vendasService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendasService.remove(id);
  }
  @Get('resumo')
  async getResumo() {
    return this.vendasService.getResumo();
  }

}