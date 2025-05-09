<template>
  <div class="bg-white rounded-xl shadow-md border border-zinc-200 p-4 transition-all duration-300 hover:shadow-lg">
    <div class="flex items-center mb-3">
      <div class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
        <span class="font-medium text-sm">
          {{ getProductInitials(report.product) }}
        </span>
      </div>
      <div class="ml-3">
        <div class="text-sm font-medium text-zinc-900">{{ report.product }}</div>
        <div class="text-xs text-zinc-500">#{{ report.productId }}</div>
      </div>
      <div class="ml-auto">
        <span :class="[
          'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
          getStatusClass(report.status)
        ]">
          {{ report.status }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-y-2 text-xs mb-3">
      <div class="text-zinc-500">Reported By:</div>
      <div class="text-zinc-900">{{ report.reportedBy }}</div>

      <div class="text-zinc-500">Issue Type:</div>
      <div class="text-zinc-900">{{ report.issueType }}</div>

      <div class="text-zinc-500">Date:</div>
      <div class="text-zinc-900">{{ formatDate(report.date) }}</div>
    </div>

    <div class="text-xs mb-3">
      <div class="text-zinc-500 mb-1">Description:</div>
      <div class="text-zinc-900 line-clamp-2">{{ report.description }}</div>
    </div>

    <div class="flex justify-end mt-2 pt-2 border-t border-zinc-100">
      <button
        @click="$emit('click')"
        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-black bg-zinc-100 rounded-md hover:bg-zinc-200 transition-all duration-300 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Report {
  id: string;
  product: string;
  productId: string;
  reportedBy: string;
  email: string;
  issueType: string;
  description: string;
  date: string;
  status: string;
}

const props = defineProps<{
  report: Report;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const getProductInitials = (productName: string): string => {
  return productName
    .split(' ')
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
      return 'bg-black text-white';
    case 'rejected':
      return 'bg-zinc-200 text-zinc-800';
    default:
      return 'bg-zinc-200 text-zinc-800';
  }
};
</script>