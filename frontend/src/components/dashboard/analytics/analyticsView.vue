<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-zinc-900">Sales Analytics</h1>
      <button @click="$emit('export-data')"
        class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export Data
      </button>
    </div>

    <!-- Graph Overview Section -->
    <div class="bg-white rounded-xl shadow-md border border-zinc-200 p-4 mb-6 transition-all duration-300 hover:shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Overview</h2>
      <div class="h-64">
        <SalesGraph :data="graphData" />
      </div>
    </div>

    <!-- Mobile View -->
    <div class="block sm:hidden space-y-3">
      <div v-for="(metric, index) in metrics" :key="`mobile-${index}`"
        class="bg-white rounded-xl shadow-md border border-zinc-200 p-4 transition-all duration-300 hover:shadow-lg">
        <div class="flex items-center mb-3">
          <div
            class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
            <span class="font-medium text-sm">
              {{ metric.icon }}
            </span>
          </div>
          <div class="ml-3">
            <div class="text-sm font-medium text-zinc-900">{{ metric.name }}</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-y-2 text-xs mb-3">
          <div class="text-zinc-500">Current:</div>
          <div class="text-zinc-900 break-all">{{ metric.current }}</div>

          <div class="text-zinc-500">Previous:</div>
          <div class="text-zinc-900">{{ metric.previous }}</div>

          <div class="text-zinc-500">Change:</div>
          <div>
            <span :class="[
              'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
              metric.trend === 'up'
                ? 'bg-black text-white'
                : 'bg-zinc-200 text-zinc-800'
            ]">
              <svg v-if="metric.trend === 'up'" xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              {{ metric.change }}
            </span>
          </div>
        </div>

        <!-- Mini Graph for each metric -->
        <div class="h-20 mb-3">
          <MiniGraph :data="metric.graphData" :color="metric.trend === 'up' ? '#000000' : '#71717a'" />
        </div>

        <div class="flex justify-between mt-2 pt-2 border-t border-zinc-100">
          <button @click="$emit('view-details', metric, metric.id)"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-black bg-zinc-100 rounded-md hover:bg-zinc-200 transition-all duration-300 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Details
          </button>
          <button @click="$emit('filter-metric', metric)"
            class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-black bg-zinc-100 rounded-md hover:bg-zinc-200 transition-all duration-300 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="hidden sm:block bg-white rounded-xl shadow-md border border-zinc-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-zinc-200">
          <thead class="bg-zinc-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Metric</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Current</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Previous</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Change</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Trend</th>
              <th class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-zinc-100">
            <tr v-for="(metric, index) in metrics" :key="`desktop-${index}`"
              class="hover:bg-zinc-50 transition-colors">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
                    <span class="font-medium text-sm">
                      {{ metric.icon }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-zinc-900">{{ metric.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-zinc-900">{{ metric.current }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-zinc-900">{{ metric.previous }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                  metric.trend === 'up'
                    ? 'bg-black text-white'
                    : 'bg-zinc-200 text-zinc-800'
                ]">
                  <svg v-if="metric.trend === 'up'" xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  {{ metric.change }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="w-24 h-10">
                  <MiniGraph :data="metric.graphData" :color="metric.trend === 'up' ? '#000000' : '#71717a'" />
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-3">
                  <button @click="$emit('view-details', metric, metric.id)"
                    class="text-black hover:text-zinc-700 transition-colors">
                    Details
                  </button>
                  <button @click="$emit('filter-metric', metric)"
                    class="text-black hover:text-zinc-700 transition-colors">
                    Filter
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
import { ref, onMounted } from 'vue';
import SalesGraph from '@/components/dashboard/analytics/sales-graph.vue';
import MiniGraph from '@/components/dashboard/analytics/mini-graph.vue';

defineProps<{
  metrics: any;
  graphData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}>();

defineEmits<{
  (e: 'export-data'): void;
  (e: 'view-details', metric: any, id: string): void;
  (e: 'filter-metric', metric: any): void;
}>();
</script>
