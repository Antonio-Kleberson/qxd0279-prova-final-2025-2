
import { AppDataSource } from './data-source';
import { User } from '../modules/user/user.entity';
import { Projeto } from '../modules/projeto/projeto.entity';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const projetoRepo = AppDataSource.getRepository(Projeto);

  await projetoRepo.clear();
  await userRepo.clear();

  const admin = await userRepo.save(userRepo.create({
    name: 'Administrador',
    email: 'admin@teste.com',
    password: '123456',
    role: 'ADMIN',
  }));

  const user = await userRepo.save(userRepo.create({
    name: 'Usuário',
    email: 'user@teste.com',
    password: '123456',
    role: 'USER',
  }));

  const adminProjetos = Array.from({ length: 15 }).map((_, i) =>
    projetoRepo.create({
      titulo: `Projeto do Admin ${i + 1}`,
      descricao: `Descrição do projeto ${i + 1}`,
      user: admin,
    })
  );

  const userProjetos = Array.from({ length: 10 }).map((_, i) =>
    projetoRepo.create({
      titulo: `Projeto do Usuário ${i + 1}`,
      descricao: `Descrição do projeto ${i + 1}`,
      user: user,
    })
  );

  await projetoRepo.save([...adminProjetos, ...userProjetos]);

  console.log('Seed executado');
  process.exit(0);
}

seed();
