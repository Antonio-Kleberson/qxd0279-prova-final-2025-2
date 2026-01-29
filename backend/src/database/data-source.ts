
import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Projeto } from '../modules/projeto/projeto.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  entities: [User, Projeto],
});
