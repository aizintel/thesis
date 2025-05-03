<template>
    <div class="p-4 md:p-6">
        <div class="mb-6">
            <h1 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">Inventory Management System</h1>
            <p class="text-sm md:text-base text-gray-600">Welcome to your inventory dashboard. Here's an overview of
                your data.</p>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs md:text-sm font-medium text-gray-500">Total Products</p>
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mt-1">{{ productInventory.length }}</h3>
                    </div>
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-emerald-500"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 7h-9" />
                            <path d="M14 17H5" />
                            <circle cx="17" cy="17" r="3" />
                            <circle cx="7" cy="7" r="3" />
                        </svg>
                    </div>
                </div>
                <div class="mt-3 md:mt-4">
                    <div class="flex items-center justify-between text-xs md:text-sm">
                        <span class="text-gray-500">In Stock</span>
                        <span class="font-medium text-gray-900">{{ inStockCount }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs md:text-sm mt-1.5 md:mt-2">
                        <span class="text-gray-500">Low/Critical Stock</span>
                        <span class="font-medium text-gray-900">{{ lowStockCount }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs md:text-sm mt-1.5 md:mt-2">
                        <span class="text-gray-500">Out of Stock</span>
                        <span class="font-medium text-gray-900">{{ outOfStockCount }}</span>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs md:text-sm font-medium text-gray-500">Total Users</p>
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mt-1">{{ users.length }}</h3>
                    </div>
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-emerald-500"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                </div>
                <div class="mt-3 md:mt-4">
                    <div class="flex items-center justify-between text-xs md:text-sm">
                        <span class="text-gray-500">Active Users</span>
                        <span class="font-medium text-gray-900">{{ activeUserCount }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs md:text-sm mt-1.5 md:mt-2">
                        <span class="text-gray-500">Inactive Users</span>
                        <span class="font-medium text-gray-900">{{ inactiveUserCount }}</span>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs md:text-sm font-medium text-gray-500">Inventory Value</p>
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mt-1">${{ totalInventoryValue.toFixed(2)
                            }}</h3>
                    </div>
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6 text-emerald-500"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                            <path d="M12 18V6" />
                        </svg>
                    </div>
                </div>
                <div class="mt-3 md:mt-4">
                    <div class="flex items-center justify-between text-xs md:text-sm">
                        <span class="text-gray-500">Avg. Product Price</span>
                        <span class="font-medium text-gray-900">${{ averageProductPrice.toFixed(2) }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs md:text-sm mt-1.5 md:mt-2">
                        <span class="text-gray-500">Most Expensive</span>
                        <span class="font-medium text-gray-900">${{ mostExpensivePrice.toFixed(2) }}</span>
                    </div>
                </div>
            </div>
        </div>


        <div class="mb-6">
            <div class="flex items-center justify-between mb-3 md:mb-4">
                <h2 class="text-base md:text-lg font-semibold text-gray-900">Recent Products</h2>
                <button @click="$emit('set-active-tab', 'products')"
                    class="text-xs md:text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    View All
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div class="block md:hidden">
                    <div v-for="(item, index) in recentProducts" :key="`mobile-product-${index}`"
                        class="p-4 border-b border-gray-100 last:border-b-0">
                        <div class="flex items-center mb-2">
                            <div
                                class="flex-shrink-0 h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                        </div>
                        <div class="grid grid-cols-2 gap-1 text-xs">
                            <div class="text-gray-500">Category:</div>
                            <div class="text-gray-900">{{ item.category }}</div>
                            <div class="text-gray-500">Stock:</div>
                            <div class="text-gray-900">{{ item.stock }} units</div>
                            <div class="text-gray-500">Price:</div>
                            <div class="text-gray-900">${{ item?.price }}</div>
                        </div>
                    </div>
                </div>

                <div class="hidden md:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="(item, index) in recentProducts" :key="`desktop-product-${index}`"
                                class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ item.category }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ item.stock }} units</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${{ item?.price }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between mb-3 md:mb-4">
                <h2 class="text-base md:text-lg font-semibold text-gray-900">Recent Users</h2>
                <button @click="$emit('set-active-tab', 'users')"
                    class="text-xs md:text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    View All
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div class="block md:hidden">
                    <div v-for="(user, index) in recentUsers" :key="`mobile-user-${index}`"
                        class="p-4 border-b border-gray-100 last:border-b-0">
                        <div class="flex items-center mb-2">
                            <div
                                class="flex-shrink-0 h-8 w-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                <span class="font-medium text-xs">
                                    {{user.name.trim().split(' ').map((word: string[]) =>
                                        word[0].toUpperCase()).slice(0, 2).join('') }}
                                </span>
                            </div>
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        </div>
                        <div class="grid grid-cols-2 gap-1 text-xs">
                            <div class="text-gray-500">Email:</div>
                            <div class="text-gray-900 break-all">{{ user.email }}</div>
                            <div class="text-gray-500">Role:</div>
                            <div class="text-gray-900">{{ user.role }}</div>
                            <div class="text-gray-500">Status:</div>
                            <div>
                                <span
                                    :class="`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${user.statusClass}`">
                                    {{ user.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="hidden md:block overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="(user, index) in recentUsers" :key="`desktop-user-${index}`"
                                class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-8 w-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                                            <span class="font-medium text-xs">
                                                {{user.name.trim().split(' ').map((word: string[]) =>
                                                word[0].toUpperCase()).slice(0, 2).join('') }}
                                            </span>
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ user.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ user.role }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        :class="`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.statusClass}`">
                                        {{ user.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    productInventory: any[];
    users: any[];
    inStockCount: number;
    lowStockCount: number;
    outOfStockCount: number;
    activeUserCount: number;
    inactiveUserCount: number;
    totalInventoryValue: number;
    averageProductPrice: number;
    mostExpensivePrice: number;
    recentProducts: any[];
    recentUsers: any[];
}>();

defineEmits<{
    (e: 'set-active-tab', tab: string): void;
}>();
</script>