
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../modules/user/user.entity';


export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Token missing' });

  const [, token] = auth.split(' ');

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, 'secret-key') as any;
    const { id } = decoded

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
