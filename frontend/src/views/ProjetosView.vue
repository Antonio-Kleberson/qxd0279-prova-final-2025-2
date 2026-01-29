<template>
  <div>
    <h1>Projetos</h1>

    <div v-if="projetos.length">
      <ProjetoCard v-for="p in projetos" :key="p.id" :projeto="p" />
    </div>
    <div v-else>
      <p>Nenhum projeto encontrado.</p>
    </div>

    <div style="display:flex; gap: 12px; align-items:center; margin-top: 16px;">
      <button @click="prev" :disabled="page <= 1">Anterior</button>
      <span>Página {{ meta.page }} de {{ meta.totalPages }}</span>
      <button @click="next" :disabled="page >= meta.totalPages">Próximo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProjetosService } from '@/services/projetosService';
import ProjetoCard from '@/components/ProjetoCard.vue';

const projetos = ref<any[]>([]);
const projetosService = useProjetosService()

const page = ref(1)
const limit = 10
const meta = ref({ page: 1, limit: 10, total: 0, totalPages: 1 })

async function load() {
  const res = await projetosService.getAll(page.value, limit)
  projetos.value = res.data.data
  meta.value = res.data.meta
}

async function next() {
  if (page.value < meta.value.totalPages) {
    page.value++
    await load()
  }
}

async function prev() {
  if (page.value > 1) {
    page.value--
    await load()
  }
}

onMounted(async () => {
  try {
    await load()
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
  }
});
</script>
