<template>
    <div class="sticky top-0 z-20 flex items-center h-16 px-4 bg-white border-b border-gray-100 md:hidden">
        <button @click="$emit('toggle-sidebar')" class="p-1 mr-4 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
        </button>
        <span class="text-lg font-semibold text-gray-900">{{ pageTitle }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    pageTitle: string;
}>();

defineEmits<{
    (e: 'toggle-sidebar'): void;
}>();
</script>