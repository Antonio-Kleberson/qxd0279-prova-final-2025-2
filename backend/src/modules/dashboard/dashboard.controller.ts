import type { Request, Response } from 'express'
import { DashboardService } from './dashboard.service'

export class DashboardController {
  async index(req: Request, res: Response) {
    const service = new DashboardService()
    const { user } = req
    return res.json(await service.getDashboardData(user))
  }
}
