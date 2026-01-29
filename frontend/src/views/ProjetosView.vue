
<template>
  <div>
    <h1>Projetos</h1>
    <div v-if="projetos.length">
      <ProjetoCard v-for="p in projetos" :key="p.id" :projeto="p" />
    </div>
    <div v-else>
      <p>Nenhum projeto encontrado.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProjetosService } from '@/services/projetosService';
import ProjetoCard from '@/components/ProjetoCard.vue';

const projetos = ref<any[]>([]);
const projetosService = useProjetosService()

onMounted(async () => {
  try {
    const res = await projetosService.getAll();
    projetos.value = res.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
});
</script>
