
import type { Request, Response } from 'express';
import { ProjetoService } from './projeto.service';

export class ProjetoController {
  async index(req: Request, res: Response) {
    const service = new ProjetoService();
    return res.json(await service.list());
  }

}
