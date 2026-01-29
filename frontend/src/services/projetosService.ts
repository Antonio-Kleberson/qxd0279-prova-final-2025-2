import { api } from "./api";

type ProjetosResponse = {
  data: any[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

class ProjetosService {
  async getAll(page = 1, limit = 10, search = "", sort = "", order: "asc" | "desc" = "asc") {
    const params: any = { page, limit };

    if (search) params.search = search;
    if (sort) params.sort = sort;
    if (order) params.order = order;

    return await api.get<ProjetosResponse>("/api/projetos", { params });
  }
}

export const useProjetosService = () => new ProjetosService();
