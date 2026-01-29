import { Router } from 'express'
import { DashboardController } from './dashboard.controller'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'

const routes = Router()
const controller = new DashboardController()

routes.get('/', ensureAuthenticated, controller.index)

export default routes
