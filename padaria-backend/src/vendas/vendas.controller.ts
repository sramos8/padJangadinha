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
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Get()
  findAll() {
    return this.vendasService.findAll();
  }

  @Post()
async create(@Body() body, @Req() req: Request) {
  const user = req.user as { id: string };
  const payload = {
    ...body,
    owner_id: user.id,
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
}