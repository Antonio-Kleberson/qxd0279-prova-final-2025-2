<template>
  <div>
    <h1>Dashboard</h1>

    <div v-if="loading">
      <p>Carregando dados do dashboard...</p>
    </div>

    <div v-else>
      <div v-if="totalProjetos !== null">
        <h2>Total de Projetos Cadastrados: {{ totalProjetos }}</h2>
      </div>

      <h2>Seus Projetos</h2>

      <div v-if="userProjetos.length">
        <ProjetoCard v-for="p in userProjetos" :key="p.id" :projeto="p" />
      </div>

      <div v-else>
        <p>Nenhum projeto encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/services/api";
import ProjetoCard from "@/components/ProjetoCard.vue";

const loading = ref(true);
const totalProjetos = ref<number | null>(null);
const userProjetos = ref<any[]>([]);

async function loadDashboard() {
  loading.value = true;

  const res = await api.post("/api/dashboard");

  if (typeof res.data.totalProjetos === "number") {
    totalProjetos.value = res.data.totalProjetos;
  } else {
    totalProjetos.value = null;
  }

  userProjetos.value = res.data.userProjetos ?? [];

  loading.value = false;
}

onMounted(() => {
  loadDashboard().catch((e) => {
    console.error("Erro ao carregar dashboard:", e);
    loading.value = false;
  });
});
</script>
