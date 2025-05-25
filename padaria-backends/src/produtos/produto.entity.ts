import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venda } from '../vendas/venda.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  quantidade: number;

  @OneToMany(() => Venda, venda => venda.produto)
  vendas: Venda[];
}
