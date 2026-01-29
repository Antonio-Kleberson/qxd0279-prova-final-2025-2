import { api } from "./api";

class ProjetosService {
  
  async getAll() {
    try {
      return await api.get('/api/projetos');
    } catch(e) {
      console.error(`Você ainda precisa tratar o error`, e)
      throw e
    }
    
  
  }
}

export const useProjetosService = () => new ProjetosService()