
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routes from './routes';

const app = express();

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
