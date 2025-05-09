<template>
    <section id="features" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
                <h2 class="text-base text-black font-semibold tracking-wide uppercase">Features</h2>
                <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                    Everything you need to manage your station
                </p>
                <p class="mt-4 max-w-2xl text-xl text-zinc-500 lg:mx-auto">
                    Our system provides comprehensive tools to manage your gasoline station inventory efficiently.
                </p>
            </div>

            <div class="mt-10">
                <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 ">
                    <FeatureCard v-for="(feature, index) in features" :key="index" :icon="feature.icon"
                        :title="feature.title" :description="feature.description" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import FeatureCard from './FeatureCard.vue';
import { h, defineComponent } from 'vue';

const ChartIcon = defineComponent({
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
                d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            })
        ]);
    }
});

const CreditCardIcon = defineComponent({
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
                d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
            })
        ]);
    }
});

const CalendarIcon = defineComponent({
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
                d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            })
        ]);
    }
});

const DocumentIcon = defineComponent({
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
                d: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            })
        ]);
    }
});

const features = [
    {
        icon: ChartIcon,
        title: 'Real-time Monitoring',
        description: 'Monitor fuel levels and inventory in real-time with intuitive dashboards and alerts.'
    },
    {
        icon: CreditCardIcon,
        title: 'Sales Tracking',
        description: 'Track sales and revenue with detailed reports and analytics.'
    },
    {
        icon: CalendarIcon,
        title: 'Automated Ordering',
        description: 'Set up automatic reordering when inventory levels reach predefined thresholds.'
    },
    {
        icon: DocumentIcon,
        title: 'Comprehensive Reports',
        description: 'Generate detailed reports on sales, inventory, and more with just a few clicks.'
    }
];
</script>