<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Component -->
    <TheHeader @open-login="showLoginModal = true" />

    <!-- Hero Section Component -->
    <HeroSection @open-login="showLoginModal = true" />

    <!-- Features Section Component -->
    <FeaturesSection />

    <!-- Login Modal Component -->
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @login="handleLogin" :loginError="loginError" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from '@/components/home/TheHeader.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import FeaturesSection from '@/components/home/FeaturesSection.vue';
import LoginModal from '@/components/home/LoginModal.vue';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const router = useRouter();
const showLoginModal = ref(false);
const loginError = ref(false);

const handleLogin = async (credentials: { email: string, password: string }) => {
  console.log('Login with:', credentials);

  const login = await authStore.login(credentials.email, credentials.password);

  if (authStore.user) {
  router.push("/dashboard")
  } else {

    loginError.value = true;
  }

};
</script>