
import type { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const service = new UserService();

    try {
      return res.json(await service.login(email, password));
    } catch {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  }
}
