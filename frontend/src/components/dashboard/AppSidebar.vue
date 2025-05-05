<template>
    <aside :class="[
        'fixed inset-y-0 z-30 flex flex-col w-64 transition-all duration-300 ease-in-out bg-white border-r border-gray-100 shadow-sm',
        sidebarOpen ? 'left-0' : '-left-64 md:left-0',
    ]">

        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            <div class="flex items-center gap-2">
                <div class="flex items-center justify-center w-8 h-8 rounded-md bg-emerald-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-500" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                        <path d="M21 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4" />
                        <path d="M3 9h18" />
                    </svg>
                </div>
                <span class="text-lg font-semibold text-gray-900">BAITRACK</span>
            </div>
            <button @click="$emit('toggle-sidebar')" class="p-1 rounded-md md:hidden hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
        </div>


        <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <div class="mb-4 px-3">
                <h3 class="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Management
                </h3>
            </div>

            <a href="#" @click.prevent="$emit('set-active-tab', 'dashboard')" :class="[
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg',
                activeTab === 'dashboard'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3"
                    :class="activeTab === 'dashboard' ? '' : 'text-gray-500'" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                Dashboard
            </a>

            <a href="#" @click.prevent="$emit('set-active-tab', 'products')" :class="[
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg',
                activeTab === 'products'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3"
                    :class="activeTab === 'products' ? '' : 'text-gray-500'" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                </svg>
                Products
            </a>

            <a href="#" @click.prevent="$emit('set-active-tab', 'users')" :class="[
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg',
                activeTab === 'users'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3"
                    :class="activeTab === 'users' ? '' : 'text-gray-500'" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users
            </a>

            <!-- <div class="mt-6 mb-4 px-3">
                <h3 class="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reports
                </h3>
            </div>

            <a href="#"
                class="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                Analytics
            </a> -->

            <!-- <a href="#"
                class="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                </svg>
                Reports
            </a> -->
        </nav>

        <div class="p-4 border-t border-gray-100">
            <div class="flex items-center">
                <div
                    class="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-md flex items-center justify-center">
                    <span class="font-medium text-sm">JB</span>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">John Bai</p>
                    <p class="text-xs text-gray-500">Administrator</p>
                </div>
                <button @click="$emit('logout-user')" class="ml-auto p-1 rounded-md hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>

            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
defineProps<{
    sidebarOpen: boolean;
    activeTab: string;
}>();

defineEmits<{
    (e: 'toggle-sidebar'): void;
    (e: 'set-active-tab', tab: string): void;
    (e: 'logout-user'): void;
}>();
</script>