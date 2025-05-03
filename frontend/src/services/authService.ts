// services/authService.ts
import api from './api'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface UserProfile {
  id: number
  name: string
  email: string
  role: string
  status: string
}

export const authService = {
  async login(payload: LoginPayload): Promise<UserProfile> {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  async logout(): Promise<{ message: string }> {
    const { data } = await api.post('/auth/logout')
    return data
  },
}
