<template>
    <header class="sticky top-0 z-30 w-full bg-white shadow-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">

                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <LogoIcon class="h-8 w-8 text-emerald-600" />
                        <span class="ml-2 text-xl font-bold text-gray-900">Bai Track</span>
                    </div>
                </div>


                <div class="flex items-center md:hidden">
                    <button @click="isMenuOpen = !isMenuOpen"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!isMenuOpen" class="block h-6 w-6" />
                        <XIcon v-else class="block h-6 w-6" />
                    </button>
                </div>


                <nav class="hidden md:flex md:items-center md:space-x-6">
                    <a href="#features" class="text-base font-medium text-gray-700 hover:text-gray-900">Features</a>
                    <a href="#pricing" class="text-base font-medium text-gray-700 hover:text-gray-900">Pricing</a>
                    <a href="#contact" class="text-base font-medium text-gray-700 hover:text-gray-900">Contact</a>
                    <button @click="$emit('open-login')"
                        class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                        Login
                    </button>
                </nav>
            </div>
        </div>

        <div class="md:hidden" v-show="isMenuOpen">
            <div class="pt-2 pb-3 space-y-1 px-4 sm:px-6">
                <a href="#features"
                    class="block py-2 text-base font-medium text-gray-700 hover:text-gray-900">Features</a>
                <a href="#pricing"
                    class="block py-2 text-base font-medium text-gray-700 hover:text-gray-900">Pricing</a>
                <a href="#contact"
                    class="block py-2 text-base font-medium text-gray-700 hover:text-gray-900">Contact</a>
                <button @click="$emit('open-login')"
                    class="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                    Login
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Icons
const LogoIcon = defineComponent({
    render() {
        return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        }, [
            h('path', { d: 'M3 22h12' }),
            h('path', { d: 'M19 22V9l-3-3V2' }),
            h('path', { d: 'M7 11h8' }),
            h('path', { d: 'M7 16h8' }),
            h('path', { d: 'M19 9h1.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H19' })
        ]);
    }
});

const MenuIcon = defineComponent({
    render() {
        return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 6h16M4 12h16M4 18h16'
            })
        ]);
    }
});

const XIcon = defineComponent({
    render() {
        return h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor'
        }, [
            h('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M6 18L18 6M6 6l12 12'
            })
        ]);
    }
});

import { h, defineComponent } from 'vue';

const isMenuOpen = ref(false);

defineEmits(['open-login']);
</script>