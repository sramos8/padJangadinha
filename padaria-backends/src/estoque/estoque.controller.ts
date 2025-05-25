import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  findAll() {
    return this.estoqueService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<{ quantidade: number }>) {
    return this.estoqueService.update(id, body);
  }
}