<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ projeto.titulo }}</h5>
      <p class="card-text">{{ truncatedDescription }}</p>
      <p class="card-text"><small class="text-muted">Criado em: {{ formattedDate }}</small></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Projeto } from '@/types';

const props = defineProps<{ projeto: Projeto }>();

const truncatedDescription = computed(() => {
  if (props.projeto.descricao && props.projeto.descricao.length > 100) {
    return props.projeto.descricao.substring(0, 100) + '...';
  }
  return props.projeto.descricao;
});

const formattedDate = computed(() => {
  if (props.projeto.createdAt) {
    return new Date(props.projeto.createdAt).toLocaleDateString();
  }
  return '';
});
</script>

<style scoped>
.card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  color: #333;
  line-height: 1.5;
}

.text-muted {
  color: #777 !important;
  font-size: 0.875rem;
}
</style>
