import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
//import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Post()
  create(@Body() body: { nome: string; preco: number; quantidade: number }) {
    return this.produtosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ nome: string; preco: number; quantidade: number }>) {
    return this.produtosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
}