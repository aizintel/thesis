<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-50">
      <div class="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-zinc-900 p-6 pb-0"
              >
                {{ getModalTitle() }}
              </DialogTitle>

              <div class="p-6">
                <form v-if="activeTab === 'products'" @submit.prevent="handleSubmit">
                  <div class="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                      <label for="name" class="block text-sm font-medium text-zinc-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        v-model="productFormData.name"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="productErrors.name" class="text-red-500 text-sm">{{ productErrors.name }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="sku" class="block text-sm font-medium text-zinc-700">SKU</label>
                      <input
                        type="text"
                        id="sku"
                        v-model="productFormData.sku"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="productErrors.sku" class="text-red-500 text-sm">{{ productErrors.sku }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="category" class="block text-sm font-medium text-zinc-700">Category</label>
                      <select
                        id="category"
                        v-model="productFormData.category"
                        class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all"
                      >
                        <option value="Lubricants">Lubricants</option>
                        <option value="Car Care">Car Care</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Gas">Gas</option>
                        <option value="Beverages">Beverages</option>
                      </select>
                      <span v-if="productErrors.category" class="text-red-500 text-sm">{{ productErrors.category }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="stock" class="block text-sm font-medium text-zinc-700">Stock</label>
                      <input
                        type="number"
                        id="stock"
                        v-model.number="productFormData.stock"
                        min="0"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="productErrors.stock" class="text-red-500 text-sm">{{ productErrors.stock }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="price" class="block text-sm font-medium text-zinc-700">Price (₱)</label>
                      <input
                        type="number"
                        step="0.01"
                        id="price"
                        v-model.number="productFormData.price"
                        min="0.01"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="productErrors.price" class="text-red-500 text-sm">{{ productErrors.price }}</span>
                    </div>
                  </div>
                </form>

                <form v-if="activeTab === 'users'" @submit.prevent="handleSubmit">
                  <div class="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-6">
                      <label for="user-name" class="block text-sm font-medium text-zinc-700">Full Name</label>
                      <input
                        type="text"
                        id="user-name"
                        v-model="userFormData.name"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="userErrors.name" class="text-red-500 text-sm">{{ userErrors.name }}</span>
                    </div>

                    <div class="sm:col-span-6">
                      <label for="email" class="block text-sm font-medium text-zinc-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        v-model="userFormData.email"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="userErrors.email" class="text-red-500 text-sm">{{ userErrors.email }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="role" class="block text-sm font-medium text-zinc-700">Role</label>
                      <select
                        id="role"
                        v-model="userFormData.role"
                        class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      <span v-if="userErrors.role" class="text-red-500 text-sm">{{ userErrors.role }}</span>
                    </div>

                    <div class="sm:col-span-3">
                      <label for="status" class="block text-sm font-medium text-zinc-700">Status</label>
                      <select
                        id="status"
                        v-model="userFormData.status"
                        class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border border-zinc-300 rounded-lg focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <span v-if="userErrors.status" class="text-red-500 text-sm">{{ userErrors.status }}</span>
                    </div>

                    <div v-if="!isEditing" class="sm:col-span-6">
                      <label for="password" class="block text-sm font-medium text-zinc-700">Password</label>
                      <input
                        type="password"
                        id="password"
                        v-model="userFormData.password"
                        class="p-2.5 h-10 mt-1.5 block w-full shadow-sm sm:text-sm border border-zinc-300 rounded-lg focus:ring-black focus:border-black transition-all"
                        required
                      />
                      <span v-if="userErrors.password" class="text-red-500 text-sm">{{ userErrors.password }}</span>
                    </div>
                  </div>
                </form>
              </div>

              <div class="bg-zinc-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl">
                <button
                  type="button"
                  @click="handleSubmit"
                  class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 active:scale-95"
                >
                  {{ isEditing ? 'Save Changes' : 'Add' }}
                </button>
                <button
                  type="button"
                  @click="$emit('close')"
                  class="mt-3 w-full inline-flex justify-center rounded-lg border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const productErrors = reactive({
  name: '',
  sku: '',
  category: '',
  stock: '',
  price: ''
})

const userErrors = reactive({
  name: '',
  email: '',
  role: '',
  status: '',
  password: ''
})

const props = defineProps<{
  show: boolean
  activeTab: string
  isEditing: boolean
  productFormData: any
  userFormData: any
  getModalTitle: () => string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit-form'): void
  (e: 'submit-user-form'): void
}>()

function validateProductForm() {
  productErrors.name = props.productFormData.name ? '' : 'Name is required.'
  productErrors.sku = props.productFormData.sku ? '' : 'SKU is required.'
  productErrors.category = props.productFormData.category ? '' : 'Category is required.'
  productErrors.stock = props.productFormData.stock >= 0 ? '' : 'Stock must be a positive number.'
  productErrors.price = props.productFormData.price >= 0.01 ? '' : 'Price must be at least ₱0.01.'
  return Object.values(productErrors).every(err => !err)
}

function validateUserForm() {
  userErrors.name = props.userFormData.name ? '' : 'Full name is required.'
  userErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.userFormData.email) ? '' : 'Enter a valid email.'
  userErrors.role = props.userFormData.role ? '' : 'Role is required.'
  userErrors.status = props.userFormData.status ? '' : 'Status is required.'
  userErrors.password = props.isEditing ? '' : (props.userFormData.password ? '' : 'Password is required.')
  return Object.values(userErrors).every(err => !err)
}

function handleSubmit() {
  if (props.activeTab === 'products' && validateProductForm()) {
    emit('submit-form')
  } else if (props.activeTab === 'users' && validateUserForm()) {
    emit('submit-user-form')
  }
}
</script>