<template>
    <div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 class="text-xl md:text-2xl font-bold text-zinc-900">Users</h1>
            <button @click="$emit('open-add-item-modal')"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                Add User
            </button>
        </div>

        <div class="block sm:hidden space-y-3">
            <div v-for="(user, index) in users" :key="`mobile-${index}`"
                class="bg-white rounded-xl shadow-md border border-zinc-200 p-4 transition-all duration-300 hover:shadow-lg">
                <div class="flex items-center mb-3">
                    <div
                        class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
                        <span class="font-medium text-sm">
                            {{user?.name?.trim().split(' ').map((word: string[]) => word[0].toUpperCase()).slice(0,
                                2).join('')
                            }}
                        </span>
                    </div>
                    <div class="ml-3">
                        <div class="text-sm font-medium text-zinc-900">{{ user.name }}</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-y-2 text-xs mb-3">
                    <div class="text-zinc-500">Email:</div>
                    <div class="text-zinc-900 break-all">{{ user.email }}</div>

                    <div class="text-zinc-500">Role:</div>
                    <div class="text-zinc-900">{{ user.role }}</div>

                    <div class="text-zinc-500">Status:</div>
                    <div>
                        <span :class="[
                            'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                            user.status === 'Active'
                                ? 'bg-black text-white'
                                : 'bg-zinc-200 text-zinc-800'
                        ]">
                            <svg v-if="user.status.toLowerCase() === 'active'" xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {{ user.status }}
                        </span>
                    </div>
                </div>

                <div class="flex justify-between mt-2 pt-2 border-t border-zinc-100">
                    <button @click="$emit('edit-user', user, user.id)"
                        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-black bg-zinc-100 rounded-md hover:bg-zinc-200 transition-all duration-300 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                    <button @click="$emit('confirm-delete-user', user)"
                        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-all duration-300 active:scale-95">
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

        <div class="hidden sm:block bg-white rounded-xl shadow-md border border-zinc-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-200">
                    <thead class="bg-zinc-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                User</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Email</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Role</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Status</th>
                            <th class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-zinc-100">
                        <tr v-for="(user, index) in users" :key="`desktop-${index}`"
                            class="hover:bg-zinc-50 transition-colors">
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
                                        <span class="font-medium text-sm">
                                            {{user?.name?.trim().split(' ').map((word: string[]) =>
                                                word[0].toUpperCase()).slice(0, 2).join('')}}
                                        </span>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-zinc-900">{{ user.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-900">{{ user.email }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-900">{{ user.role }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                                    user.status === 'Active'
                                        ? 'bg-black text-white'
                                        : 'bg-zinc-200 text-zinc-800'
                                ]">
                                    <svg v-if="user.status === 'Active'" xmlns="http://www.w3.org/2000/svg"
                                        class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        stroke-width="3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {{ user.status }}
                                </span>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end space-x-3">
                                    <button @click="$emit('edit-user', user, user.id)"
                                        class="text-black hover:text-zinc-700 transition-colors">
                                        Edit
                                    </button>
                                    <button @click="$emit('confirm-delete-user', user)"
                                        class="text-black hover:text-red-700 transition-colors">
                                        Delete
                                    </button>
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
    users: any[];
}>();

defineEmits<{
    (e: 'open-add-item-modal'): void;
    (e: 'edit-user', user: any, id: any): void;
    (e: 'confirm-delete-user', user: any): void;
}>();
</script>