import { Controller, Post, Get, Body, Param, Put, Delete, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { AuthGuard } from '../auth/auth.guard'; // ajuste conforme a localização do seu guard
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('produtos')
@UseGuards(AuthGuard)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

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
  async findAll() {
    return this.produtosService.findAll();
  }

 @Post()
  async create(@Body() body, @Req() req: Request) {
    const userId = this.extrairUserId(req);
    console.log('User ID from request:', userId);
    return this.produtosService.create({ ...body, owner_id: userId });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body, @Req() req: Request) {
    const userId = this.extrairUserId(req);
    return this.produtosService.update(id, { ...body, owner_id: userId });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}
