import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { api } from "@/services/api";

type Role = "ADMIN" | "USER";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<User | null>(
    localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) as string) : null
  );

  const isAuthenticated = computed(() => !!token.value);

  function applyToken(t: string | null) {
    token.value = t;

    if (t) {
      localStorage.setItem(TOKEN_KEY, t);
      api.defaults.headers.common.Authorization = `Bearer ${t}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common.Authorization;
    }
  }

  function restore() {
    const t = localStorage.getItem(TOKEN_KEY);
    applyToken(t);

    const u = localStorage.getItem(USER_KEY);
    user.value = u ? JSON.parse(u) : null;
  }

  async function login(email: string, password: string) {
    const res = await api.post("/login", { email, password });

    const t: string = res.data.token;
    const u: User = res.data.user;

    applyToken(t);
    user.value = u;
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }

  function logout() {
    applyToken(null);
    user.value = null;
    localStorage.removeItem(USER_KEY);
  }

  restore();

  return { token, user, isAuthenticated, login, logout, restore };
});
