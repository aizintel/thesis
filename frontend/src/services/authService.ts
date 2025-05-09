// services/authService.ts
import api from './api'

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  user: null;
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<UserProfile> {
    const { data } = await api.post('/auth/sign-in', payload)
    return data.data;
  },
  async logout(): Promise<{ message: string }> {
    const { data } = await api.post('/auth/logout')
    return data.data.message;
  },
}
