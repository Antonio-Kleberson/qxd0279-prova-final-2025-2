
import { AppDataSource } from '../../database/data-source';
import { User } from './user.entity';
import jwt from 'jsonwebtoken';

export class UserService {
  async login(email: string, password: string) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      'secret-key',
      { expiresIn: '1d' }
    );
    
    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}
