<template>
    <div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 class="text-xl md:text-2xl font-bold text-gray-900">Products</h1>
            <button @click="$emit('open-add-item-modal')"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                Add Product
            </button>
        </div>

        <!-- Card View for Mobile -->
        <div class="block sm:hidden space-y-3">
            <div v-for="(item, index) in productInventory" :key="`mobile-${index}`"
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div class="flex items-center mb-3">
                    <div class="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            viewBox="0 0 24 24">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                        <div class="text-xs text-gray-500">SKU: {{ item.sku }}</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-y-2 text-xs mb-3">
                    <div class="text-gray-500">Category:</div>
                    <div class="text-gray-900">{{ item.category }}</div>

                    <div class="text-gray-500">Stock:</div>
                    <div class="text-gray-900">
                        {{ item.stock }} units
                        <div class="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                            <div class="h-1.5 rounded-full bg-emerald-500"
                                :style="`width: ${Math.min(100, (item.stock / 50) * 100)}%`"></div>
                        </div>
                    </div>

                    <div class="text-gray-500">Price:</div>
                    <div class="text-gray-900">₱{{ item.price.toFixed(2) }}</div>

                    <div class="text-gray-500">Status:</div>
                    <div>
                        <!-- Updated to use getStockStatus function -->
                        <span :class="[
                            'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                            getStockStatus(item.stock).class
                        ]">
                            <svg v-if="getStockStatus(item.stock).showIcon" xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {{ getStockStatus(item.stock).label }}
                        </span>
                    </div>
                </div>

                <div class="flex justify-between mt-2 pt-2 border-t border-gray-100">
                    <button @click="$emit('edit-item', item, item.id)"
                        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-md hover:bg-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                    <button @click="$emit('confirm-delete-product', item)"
                        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <!-- Table View with Horizontal Scroll for Tablet/Desktop -->
        <div class="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                            <th class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        <tr v-for="(item, index) in productInventory" :key="`desktop-${index}`"
                            class="hover:bg-gray-50 transition-colors">
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                                        <div class="text-xs text-gray-500">SKU: {{ item.sku }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ item.category }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ item.stock }} units</div>
                                <div class="w-24 bg-gray-100 rounded-full h-1.5 mt-1.5">
                                    <div class="h-1.5 rounded-full bg-emerald-500"
                                        :style="`width: ${Math.min(100, (item.stock / 50) * 100)}%`"></div>
                                </div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${{ item.price.toFixed(2) }}
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                                    getStockStatus(item.stock).class
                                ]">
                                    <svg v-if="getStockStatus(item.stock).showIcon" xmlns="http://www.w3.org/2000/svg"
                                        class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        stroke-width="3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {{ getStockStatus(item.stock).label }}
                                </span>

                            </td>
                            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end space-x-3">
                                    <button @click="$emit('edit-item', item, item.id)"
                                        class="text-emerald-600 hover:text-emerald-900 transition-colors">Edit</button>
                                    <button @click="$emit('confirm-delete-product', item)"
                                        class="text-emerald-600 hover:text-red-900 transition-colors">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    productInventory: any[];
}>();


function getStockStatus(stock: number) {
    if (stock > 20) {
        return {
            label: 'In Stock',
            class: 'bg-emerald-100 text-emerald-800',
            showIcon: true
        };
    } else if (stock > 5) {
        return {
            label: 'Low Stock',
            class: 'bg-amber-100 text-amber-800',
            showIcon: true
        };
    } else if (stock > 0) {
        return {
            label: 'Critical',
            class: 'bg-red-100 text-red-800',
            showIcon: true
        };
    } else {
        return {
            label: 'Out of Stock',
            class: 'bg-gray-100 text-gray-800',
            showIcon: false
        };
    }
}

defineEmits<{
    (e: 'open-add-item-modal'): void;
    (e: 'edit-item', item: any, id: any): void;
    (e: 'confirm-delete-product', item: any): void;
}>();
</script>