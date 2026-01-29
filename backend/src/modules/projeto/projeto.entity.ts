
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  titulo!: string;

  @Column({ type: "varchar" })
  descricao!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User)
  user!: User;
}
