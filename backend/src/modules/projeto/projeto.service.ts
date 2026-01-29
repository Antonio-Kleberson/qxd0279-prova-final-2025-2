import { AppDataSource } from '../../database/data-source';
import { User } from '../user/user.entity';
import { Projeto } from './projeto.entity';

type Order = 'asc' | 'desc';

export class ProjetoService {
  async listPaginated(params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: Order;
  }) {
    const repo = AppDataSource.getRepository(Projeto);

    const page =
      Number.isFinite(params.page) && (params.page ?? 0) > 0 ? Number(params.page) : 1;

    const limit =
      Number.isFinite(params.limit) && (params.limit ?? 0) > 0 && Number(params.limit) <= 100
        ? Number(params.limit)
        : 10;

    const search = (params.search ?? '').toString().trim();
    const sort = (params.sort ?? '').toString().trim();
    const order: Order = (params.order ?? 'asc').toString().toLowerCase() === 'desc' ? 'desc' : 'asc';

    const allowedSortFields: Record<string, string> = {
      titulo: 'projeto.titulo',
      createdAt: 'projeto.createdAt',
      id: 'projeto.id',
    };

    const sortColumn = allowedSortFields[sort] ?? 'projeto.id';

    const qb = repo
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.user', 'user');

    if (search) {
      qb.andWhere(
        '(LOWER(projeto.titulo) LIKE :q OR LOWER(projeto.descricao) LIKE :q)',
        { q: `%${search.toLowerCase()}%` }
      );
    }

    qb.orderBy(sortColumn, order.toUpperCase() as 'ASC' | 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

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
