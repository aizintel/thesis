// services/userService.ts
import api from './api'

/** --- User Types --- **/
export interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'employee' | 'manager' | 'viewer'
  status: 'active' | 'inactive' | 'Active' | 'Inactive'
}

export interface CreateUserPayload {
  id?: any;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
}

/** --- Product Types --- **/
export interface Product {
  id: any;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
}

export interface CreateProductPayload {
  id?: any;
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  status?: string | undefined;
}

/** --- User Service --- **/
export const userService = {
  async getAll(): Promise<User[]> {
    const { data } = await api.post('/user/all')
    return data.data;
  },

  async getById(id: number | string): Promise<User> {
    const { data } = await api.get(`/users/${id}`)
    return data
  },

  async create(payload: CreateUserPayload): Promise<User> {
    const { data } = await api.post('/user/add', payload)
    return data.data;
  },

  async update(payload: Partial<CreateUserPayload>): Promise<User> {
    const { data } = await api.put(`/user/edit`, payload)
    return data.data
  },

  async remove(id: number | string | null): Promise<{ message: string }> {
    const { data } = await api.delete(`/user/delete/${id}`)
    return data.data
  }
}

/** --- Product Service --- **/
export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await api.post('user/product/all')
    return data.data;
  },

  async getById(id: number): Promise<Product> {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const { data } = await api.post('/user/product/add', payload)
    return data.data
  },

  async update(payload: Partial<CreateProductPayload>): Promise<Product> {
    const { data } = await api.put(`/user/product/edit`, payload)
    return data.data;
  },

  async remove(id: any): Promise<{ message: string }> {
    const { data } = await api.delete(`/user/product/delete/${id}`)
    return data.data;
  }
}
