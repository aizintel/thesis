<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <TheHeader @open-login="showLoginModal = true" />

    <!-- Hero Section Component -->
    <HeroSection @open-login="showLoginModal = true" />

    <!-- Features Section Component -->
    <FeaturesSection />

    <!-- Login Modal Component -->
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from '@/components/home/TheHeader.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import FeaturesSection from '@/components/home/FeaturesSection.vue';
import LoginModal from '@/components/home/LoginModal.vue';

const router = useRouter();
const showLoginModal = ref(false);

const handleLogin = (credentials: { email: string, password: string, remember: boolean }) => {
  console.log('Login with:', credentials);
  router.push('/dashboard');
};
</script>