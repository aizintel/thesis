import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type UserProfile } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const token = ref<string | null>(localStorage.getItem('access_token'))
  const loading = ref(false)
  const error = ref<string | null>(null);
  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const data = await authService.login({ email, password })
      user.value = data
      token.value = data.token
      localStorage.setItem('access_token', data.token)
    } catch (err: any) {
      error.value = extractErrorMessage(err)
      user.value = null
      token.value = null
      localStorage.removeItem('access_token')
    } finally {
      loading.value = false
    }
  }

  async function checkAuth(): Promise<boolean> {
    const storedToken = localStorage.getItem('access_token')
    if (!storedToken) {
      logout()
      return false
    }

    try {
      const data = await authService.check()
      user.value = data;
      token.value = storedToken;
      return true
    } catch {
      logout();
      token.value = null;
      return false;
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } catch (err: any) {
      console.warn('Logout failed:', extractErrorMessage(err))
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('access_token')
    }
  }

  function extractErrorMessage(err: any): string {
    return err?.response?.data?.message || err?.message || 'Unknown error occurred'
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,

    checkAuth,
    login,
    logout,
  }
})
