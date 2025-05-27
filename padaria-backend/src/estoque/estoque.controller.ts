import { Controller, Post, Get, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('estoque')
@UseGuards(AuthGuard)
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  async findAll() {
    return this.estoqueService.findAll();
  }

  @Post()
  async create(@Body() body, @Req() req: Request) {
    const user = req.user as { id: string };
    const payload = {
      ...body,
      owner_id: user.id,
    };
    return this.estoqueService.create(payload);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.estoqueService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.estoqueService.remove(id);
  }
}
