import { Module } from '@nestjs/common';
import { ItensProduzidoService } from './itens-produzido.service';
import { ItensProduzidoController } from './itens-produzido.controller';

@Module({
  controllers: [ItensProduzidoController],
  providers: [ItensProduzidoService],
})
export class ItensProduzidoModule {}
