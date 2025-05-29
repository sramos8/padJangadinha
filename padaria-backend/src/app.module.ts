import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';
import { EstoqueModule } from './estoque/estoque.module';
import { ItensProduzidoModule } from './itensProduzido/itens-produzido.module';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna disponível em toda a aplicação
      envFilePath: '.env', // Caminho do seu arquivo .env
    }),
    AuthModule,
    UsersModule,
    ProdutosModule,
    VendasModule,
    EstoqueModule,
    ItensProduzidoModule,
    RelatorioModule,
  ],
})
export class AppModule {}
