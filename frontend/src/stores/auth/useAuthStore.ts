import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService, type UserProfile } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const data = await authService.login({ email, password })
      user.value = data
    } catch (err: any) {
      error.value = extractErrorMessage(err)
      user.value = null
    } finally {
      loading.value = false
    }
  }
  async function logout() {
    try {
      await authService.logout()
    } catch (err: any) {
      console.warn('Logout failed:', extractErrorMessage(err))
    } finally {
      user.value = null
    }
  }

  function extractErrorMessage(err: any): string {
    return err?.response?.data?.message || err?.message || 'Unknown error occurred'
  }

  return {
    user,
    loading,
    error,
    login,
    logout
  }
})
