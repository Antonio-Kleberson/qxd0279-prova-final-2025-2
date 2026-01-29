<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.restore()
})
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <h1><RouterLink to="/">Meus Projetos</RouterLink></h1>
        <div>
          <template v-if="authStore.isAuthenticated">
            <RouterLink to="/admin">Dashboard</RouterLink>
            <a href="#" @click.prevent="authStore.logout()">Sair</a>
          </template>
          <template v-else>
            <RouterLink to="/login">Login</RouterLink>
          </template>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style>
/* Global Styles */
:root {
  --primary-color: #007bff;
  --primary-color-hover: #0056b3;
  --secondary-color: #f8f9fa;
  --text-color: #333;
  --border-radius: 8px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  background-color: #f4f7f6;
  color: var(--text-color);
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header & Nav */
header {
  background-color: var(--secondary-color);
  padding: 1rem 0;
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav a {
  text-decoration: none;
  color: var(--primary-color);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: background-color 0.3s, color 0.3s;
}

nav h1 a {
  color: var(--text-color);
  padding: 0;
}

nav a:not(h1 a):hover {
  background-color: var(--primary-color);
  color: white;
}


/* Main Content */
main {
  padding: 1rem 0;
}

/* Global Form & Button Styles */
h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box; /* Added for correct width */
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--primary-color-hover);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--shadow);
}
</style>