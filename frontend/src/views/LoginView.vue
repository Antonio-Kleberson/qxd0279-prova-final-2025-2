<template>
  <form @submit.prevent="onSubmit">
    <h1>Login</h1>

    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />

    <button type="submit" :disabled="loading">
      {{ loading ? "Entrando..." : "Entrar" }}
    </button>

    <p v-if="error" style="margin-top: 12px; color: #c0392b;">
      {{ error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");

const loading = ref(false);
const error = ref("");

async function onSubmit() {
  error.value = "";
  loading.value = true;

  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch {
    error.value = "Credenciais inválidas";
  } finally {
    loading.value = false;
  }
}
</script>
