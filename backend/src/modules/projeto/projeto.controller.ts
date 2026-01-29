import type { Request, Response } from 'express';
import { ProjetoService } from './projeto.service';

export class ProjetoController {
  async index(req: Request, res: Response) {
    const service = new ProjetoService();

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const search = (req.query.search ?? '').toString();
    const sort = (req.query.sort ?? '').toString();
    const order = (req.query.order ?? 'asc').toString().toLowerCase() as 'asc' | 'desc';

    const result = await service.listPaginated({ page, limit, search, sort, order });
    return res.json(result);
  }
}
