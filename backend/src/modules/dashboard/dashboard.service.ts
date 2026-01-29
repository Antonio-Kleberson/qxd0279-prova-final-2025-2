import { AppDataSource } from '../../database/data-source'
import { Projeto } from '../projeto/projeto.entity'
import { User } from '../user/user.entity'

export class DashboardService {
  async getDashboardData(user: User) {
    const repo = AppDataSource.getRepository(Projeto)
    const userProjetos = await repo.find({
        where: { user: { id: user.id } },
        relations: ['user']
    })
    if (user.role === 'ADMIN') {
      const totalProjetos = await repo.count()
    
      return { totalProjetos, userProjetos }
    } 
    return { userProjetos }
  }
}
