import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { supabase } from '../supabase/supabase.client';

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
  async update(
    @Param('id') id: string,
    @Body() data: { produto_id: string; quantidade: number; unidade: string }
  ) {
    return this.estoqueService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.estoqueService.remove(id);
  }

  @Get('resumo')
  async getResumoEstoque() {
       return this.estoqueService.getResumoEstoque();
  }

}
