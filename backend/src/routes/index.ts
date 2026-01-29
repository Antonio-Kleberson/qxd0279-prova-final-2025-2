
import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import projetoRoutes from '../modules/projeto/projeto.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/api/projetos', projetoRoutes);
routes.use('/api/dashboard', dashboardRoutes);

export default routes;
