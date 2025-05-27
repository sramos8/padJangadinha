import { Controller, Post, Get, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { AuthGuard } from '../auth/auth.guard'; // ajuste conforme a localização do seu guard
import { Request } from 'express';

@Controller('produtos')
@UseGuards(AuthGuard)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findAll() {
    return this.produtosService.findAll();
  }

 @Post()
  async create(@Body() body, @Req() req: Request) {
    const userId = req.user?.id;
    return this.produtosService.create({ ...body, owner_id: userId });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.produtosService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
