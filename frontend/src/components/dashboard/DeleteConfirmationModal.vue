<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="$emit('close')" class="relative z-50">
            <div class="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-zinc-900 p-6 pb-0">
                                Confirm Delete
                            </DialogTitle>

                            <div class="p-6">
                                <p class="text-sm text-zinc-500">
                                    Are you sure you want to delete this {{ deleteItemType }}? This action cannot be
                                    undone.
                                </p>
                            </div>

                            <div class="bg-zinc-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-xl">
                                <button type="button" @click="$emit('delete-item')"
                                    class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 active:scale-95">
                                    Delete
                                </button>
                                <button type="button" @click="$emit('close')"
                                    class="mt-3 w-full inline-flex justify-center rounded-lg border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 active:scale-95">
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
    deleteItemType: string;
}>();

defineEmits<{
    (e: 'close'): void;
    (e: 'delete-item'): void;
}>();
</script>