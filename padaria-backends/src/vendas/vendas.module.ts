/* import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { Venda } from './venda.entity';
import { Produto } from '../produtos/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, Produto])],
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {} */

import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';

@Module({
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}