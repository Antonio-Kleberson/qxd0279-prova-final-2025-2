import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProjetosView from '../views/ProjetosView.vue'
import DashboardView from '../views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'projetos', component: ProjetosView, meta: { public: true } },

    { path: '/login', name: 'login', component: LoginView, meta: { public: true } },

    { path: '/admin', name: 'admin', component: DashboardView, meta: { auth: true, admin: true } }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  auth.restore()

  if (to.meta.public) return true

  if (to.meta.auth && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.meta.admin && auth.user?.role !== 'ADMIN') {
    return '/'
  }

  return true
})

export default router
