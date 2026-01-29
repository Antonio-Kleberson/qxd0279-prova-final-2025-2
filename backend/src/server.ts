import express from 'express';
import app from './app.js';
import projetoRoutes from './modules/projeto/projeto.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

app.use(express.json());
app.use(projetoRoutes);
app.use('/api/dashboard', dashboardRoutes)