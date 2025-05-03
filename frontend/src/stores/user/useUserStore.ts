import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  userService,
  productService,
  type User,
  type CreateUserPayload,
  type Product,
  type CreateProductPayload
} from '@/services/userService'

export const useUserStore = defineStore('user', () => {
  /** --- Users --- **/
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)

  /** --- Products --- **/
  const products = ref<Product[]>([])
  const selectedProduct = ref<Product | null>(null)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /** --- User Actions --- **/
  async function fetchUsers() {
    isLoading.value = true
    error.value = null
    try {
      users.value = await userService.getAll();
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function getUser(id: number | string) {
    isLoading.value = true
    error.value = null
    try {
      selectedUser.value = await userService.getById(id)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function createUser(payload: CreateUserPayload) {
    isLoading.value = true
    error.value = null
    try {
      const newUser = await userService.create(payload)
      users.value.push(newUser)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function updateUser(payload: Partial<CreateUserPayload>) {
    isLoading.value = true
    error.value = null
    try {
      const updatedUser = await userService.update(payload)
      const index = users.value.findIndex(u => u.id === payload.id);
      if (index !== -1) users.value[index] = updatedUser
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function deleteUser(id: number | string | null) {
    isLoading.value = true
    error.value = null
    try {
      await userService.remove(id)
      users.value = users.value.filter(u => u.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  /** --- Product Actions --- **/
  async function fetchProducts() {
    isLoading.value = true
    error.value = null
    try {
      products.value = await productService.getAll()
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function getProduct(id: number) {
    isLoading.value = true
    error.value = null
    try {
      selectedProduct.value = await productService.getById(id)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function createProduct(payload: CreateProductPayload) {
    isLoading.value = true
    error.value = null
    try {
      const newProduct = await productService.create(payload)
      products.value.push(newProduct)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(payload: Partial<CreateProductPayload>) {
    isLoading.value = true
    error.value = null
    try {
      const updatedProduct = await productService.update(payload)
      const index = products.value.findIndex(p => p.id === payload.id)
      if (index !== -1) products.value[index] = updatedProduct
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: any) {
    isLoading.value = true
    error.value = null
    try {
      await productService.remove(id)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    // User
    users,
    selectedUser,
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,

    // Product
    products,
    selectedProduct,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    // Shared
    isLoading,
    error
  }
})
