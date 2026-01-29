import { Router } from 'express';
import { ProjetoController } from './projeto.controller';

const routes = Router();
const controller = new ProjetoController();

routes.get('/', controller.index.bind(controller));

export default routes;
