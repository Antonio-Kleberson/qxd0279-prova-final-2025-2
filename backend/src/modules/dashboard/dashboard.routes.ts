import { Router } from 'express'
import { DashboardController } from './dashboard.controller'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'

const routes = Router()
const controller = new DashboardController()

routes.post('/', ensureAuthenticated, controller.index.bind(controller))

export default routes
