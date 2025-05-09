<template>
    <div class="relative">
      <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
        <component :is="icon" class="h-6 w-6" />
      </div>
      <div class="ml-16">
        <h3 class="text-lg leading-6 font-medium text-zinc-900">{{ title }}</h3>
        <p class="mt-2 text-base text-zinc-500">
          {{ description }}
        </p>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';
  
defineProps({
  icon: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>