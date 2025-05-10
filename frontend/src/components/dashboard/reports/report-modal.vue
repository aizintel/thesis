<template>
  <div class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div class="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-zinc-900">Report Details</h2>
        <button @click="$emit('close')" class="text-zinc-500 hover:text-zinc-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <div class="flex items-center mb-6">
          <div class="flex-shrink-0 h-12 w-12 bg-black text-white rounded-lg flex items-center justify-center">
            <span class="font-medium text-lg">
              {{ getProductInitials(report.product) }}
            </span>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-zinc-900">{{ report.product }}</h3>
            <p class="text-sm text-zinc-500">Product ID: {{ report.productId }}</p>
          </div>
          <div class="ml-auto">
            <span :class="[
              'px-2.5 py-1 inline-flex items-center gap-1 text-sm font-semibold rounded-full',
              getStatusClass(report.status)
            ]">
              {{ report.status }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 class="text-sm font-medium text-zinc-500 mb-2">Reported By</h4>
            <p class="text-base text-zinc-900">{{ report.reportedBy }}</p>
            <p class="text-sm text-zinc-500">{{ report.email }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-zinc-500 mb-2">Issue Type</h4>
            <p class="text-base text-zinc-900">{{ report.issueType }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-zinc-500 mb-2">Date Reported</h4>
            <p class="text-base text-zinc-900">{{ formatDate(report.date) }}</p>
            <p class="text-sm text-zinc-500">{{ formatTime(report.date) }}</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-zinc-500 mb-2">Status</h4>
            <select v-model="currentStatus" @change="handleStatusChange"
              class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="text-sm font-medium text-zinc-500 mb-2">Description</h4>
          <div class="bg-zinc-50 rounded-lg p-4 text-zinc-900 text-base">
            {{ report.description }}
          </div>
        </div>

        <div v-if="comments.length > 0" class="mb-6">
          <h4 class="text-sm font-medium text-zinc-500 mb-2">Comments</h4>
          <div v-for="(comment, index) in comments" :key="index" class="bg-zinc-50 rounded-lg p-4 mb-2 text-zinc-900">
            <p class="text-base">{{ comment }}</p>
          </div>
        </div>

        <!-- <div class="mb-6">
          <h4 class="text-sm font-medium text-zinc-500 mb-2">Add Comment</h4>
          <textarea v-model="newComment"
            class="w-full h-24 px-3 py-2 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base"
            rows="3" placeholder="Add a comment about this report..."></textarea>
        </div> -->

        <!-- Future use -->
      </div>

      <div class="px-6 py-4 border-t border-zinc-200 flex justify-between">
        <button @click="$emit('close')"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Close
        </button>
        <!-- <div class="flex space-x-3">
          <button @click="saveComment"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Save Comment
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
  comments?: string[];
}

const props = defineProps<{
  report: Report;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update-status', reportId: string, status: string): void;
  (e: 'add-comment', reportId: string, comment: string): void;
}>();

const currentStatus = ref<string>(props.report.status);
const newComment = ref<string>('');
const comments = ref<string[]>([]);

onMounted(() => {
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = '';
  };
});

const getProductInitials = (productName: string): string => {
  return productName
    .split(' ')
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('');
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
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

const handleStatusChange = (): void => {
  emit('update-status', props.report.id, currentStatus.value);
};

const saveComment = (): void => {
  if (newComment.value.trim()) {
    comments.value.push(newComment.value);
    emit('add-comment', props.report.id, newComment.value);
    newComment.value = '';
  }
};
</script>