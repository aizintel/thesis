<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="$emit('close')" class="relative z-50">
            <div class="fixed inset-0 bg-black/25" aria-hidden="true" />

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 p-6 pb-0">
                                {{ getModalTitle() }}
                            </DialogTitle>

                            <div class="p-6">
                                <form v-if="activeTab === 'products'" @submit.prevent="$emit('submit-form')">
                                    <div class="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                                        <div class="sm:col-span-6">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" id="name" v-model="productFormData.name"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
                                            <input type="text" id="sku" v-model="productFormData.sku"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="category"
                                                class="block text-sm font-medium text-gray-700">Category</label>
                                            <select id="category" v-model="productFormData.category"
                                                class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg">
                                                <option value="Lubricants">Lubricants</option>
                                                <option value="Car Care">Car Care</option>
                                                <option value="Accessories">Accessories</option>
                                                <option value="Snacks">Snacks</option>
                                                <option value="Gas">Gas</option>
                                                <option value="Beverages">Beverages</option>
                                            </select>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="stock"
                                                class="block text-sm font-medium text-gray-700">Stock</label>
                                            <input type="number" id="stock" v-model.number="productFormData.stock" min="0"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="price" class="block text-sm font-medium text-gray-700">Price
                                                ($)</label>
                                            <input type="number" step="0.01" id="price" v-model.number="productFormData.price"
                                                min="0.01"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>
                                    </div>
                                </form>

                                <form v-if="activeTab === 'users'" @submit.prevent="$emit('submit-user-form')">
                                    <div class="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                                        <div class="sm:col-span-6">
                                            <label for="user-name" class="block text-sm font-medium text-gray-700">Full
                                                Name</label>
                                            <input type="text" id="user-name" v-model="userFormData.name"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>

                                        <div class="sm:col-span-6">
                                            <label for="email"
                                                class="block text-sm font-medium text-gray-700">Email</label>
                                            <input type="email" id="email" v-model="userFormData.email"
                                                class="p-2.5 h-10 mt-1.5 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="role"
                                                class="block text-sm font-medium text-gray-700">Role</label>
                                            <select id="role" v-model="userFormData.role"
                                                class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg">
                                                <option value="Admin">Admin</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Employee">Employee</option>
                                                <option value="Viewer">Viewer</option>
                                            </select>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="status"
                                                class="block text-sm font-medium text-gray-700">Status</label>
                                            <select id="status" v-model="userFormData.status"
                                                class="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg">
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        <div v-if="!isEditing" class="sm:col-span-6">
                                            <label for="password"
                                                class="block text-sm font-medium text-gray-700">Password</label>
                                            <input type="password" id="password" v-model="userFormData.password"
                                                class="mt-1.5 p-2.5 h-10 focus:ring-emerald-500 focus:border-emerald-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                                required>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl">
                                <button type="button"
                                    @click="activeTab === 'users' ? $emit('submit-user-form') : $emit('submit-form')"
                                    class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                                    {{ isEditing ? 'Save Changes' : 'Add' }}
                                </button>
                                <button type="button" @click="$emit('close')"
                                    class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

defineProps<{
    show: boolean;
    activeTab: string;
    isEditing: boolean;
    productFormData: any;
    userFormData: any;
    getModalTitle: () => string;
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'submit-form'): void;
    (e: 'submit-user-form'): void;
}>();
</script>