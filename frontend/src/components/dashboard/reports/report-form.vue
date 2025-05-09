<template>
  <div class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
      <div class="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-zinc-900">Submit Product Report</h2>
        <button @click="$emit('close')" class="text-zinc-500 hover:text-zinc-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="product" class="block text-sm font-medium text-zinc-700 mb-2">Product Name</label>
                <input type="text" id="product" v-model="formData.product" required
                  class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
              </div>
              <div>
                <label for="productId" class="block text-sm font-medium text-zinc-700 mb-2">Product ID</label>
                <input type="text" id="productId" v-model="formData.productId" required
                  class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="reportedBy" class="block text-sm font-medium text-zinc-700 mb-2">Your Name</label>
                <input type="text" id="reportedBy" v-model="formData.reportedBy" required
                  class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-zinc-700 mb-2">Email</label>
                <input type="email" id="email" v-model="formData.email" required
                  class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
              </div>
            </div>

            <div>
              <label for="issueType" class="block text-sm font-medium text-zinc-700 mb-2">Issue Type</label>
              <select id="issueType" v-model="formData.issueType" required
                class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
                <option value="">Select an issue type</option>
                <option value="Defective Product">Defective Product</option>
                <option value="Wrong Item Received">Wrong Item Received</option>
                <option value="Not As Described">Not As Described</option>
                <option value="Damaged During Shipping">Damaged During Shipping</option>
                <option value="Missing Parts">Missing Parts</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-zinc-700 mb-2">Description</label>
              <textarea id="description" v-model="formData.description" rows="4" required
                class="w-full px-3 py-2 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base"
                placeholder="Please describe the issue in detail..."></textarea>
            </div>
          </div>
        </form>
      </div>

      <div class="px-6 py-4 border-t border-zinc-200 flex justify-between">
        <button @click="$emit('close')"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Submit Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface ReportFormData {
  product: string;
  productId: string;
  reportedBy: string;
  email: string;
  issueType: string;
  description: string;
}

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', formData: ReportFormData): void;
}>();

const formData = ref<ReportFormData>({
  product: '',
  productId: '',
  reportedBy: '',
  email: '',
  issueType: '',
  description: ''
});

onMounted(() => {
  document.body.style.overflow = 'hidden';
  
  return () => {
    document.body.style.overflow = '';
  };
});

const handleSubmit = (): void => {
  if (!formData.value.product || 
      !formData.value.productId || 
      !formData.value.reportedBy || 
      !formData.value.email || 
      !formData.value.issueType || 
      !formData.value.description) {
    alert('Please fill in all required fields');
    return;
  }
  
  emit('submit', formData.value);
};
</script>