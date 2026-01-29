
import { AppDataSource } from '../../database/data-source';
import { User } from '../user/user.entity';
import { Projeto } from './projeto.entity';

export class ProjetoService {
  async list() {
    const repo = AppDataSource.getRepository(Projeto);
    return repo.find({ relations: ['user'] });
  }

  async create(data: Partial<Projeto>, user: User) {
    const repo = AppDataSource.getRepository(Projeto);
    const projeto = repo.create({ ...data, user });
    return repo.save(projeto);
  }
}
