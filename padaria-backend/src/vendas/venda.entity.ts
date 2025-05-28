import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Produto } from '../produtos/produto.entity';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @CreateDateColumn()
  data: Date;

  @ManyToOne(() => Produto, produto => produto.vendas, { eager: true })
  produto: Produto;
}
