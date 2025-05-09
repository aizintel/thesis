<template>
    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"
            @click="$emit('close')"></div>

        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">

            <div
                class="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">

                <div class="bg-gradient-to-r from-black to-zinc-800 h-2"></div>

                <button @click="$emit('close')"
                    class="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <div class="px-6 pt-6 pb-8">

                    <div class="text-center sm:text-left mb-6">
                        <div class="flex items-center justify-center sm:justify-start mb-3">
                            <div class="bg-zinc-100 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 class="ml-3 text-xl font-semibold text-zinc-900" id="modal-title">
                                Welcome back
                            </h3>
                        </div>
                        <p class="text-zinc-500 text-sm">
                            Sign in to access your Bai Track dashboard
                        </p>
                    </div>

                    <form @submit.prevent="handleSubmit" class="space-y-5">

                        <div>
                            <label for="email" class="block text-sm font-medium text-zinc-700 mb-1">Email
                                address</label>
                            <div class="relative rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-zinc-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input id="email" name="email" type="email" required v-model="email"
                                    class="appearance-none block w-full pl-10 pr-3 py-3 border border-zinc-300 rounded-lg shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm transition-all"
                                    placeholder="you@example.com" />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-1">
                                <label for="password" class="block text-sm font-medium text-zinc-700">Password</label>
                                <!-- <div class="text-xs">
                                    <a href="#"
                                        class="font-medium text-black hover:text-zinc-700 transition-colors">
                                        Forgot password?
                                    </a>
                                </div> -->
                            </div>
                            <div class="relative rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-zinc-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                                    required v-model="password"
                                    class="appearance-none block w-full pl-10 pr-10 py-3 border border-zinc-300 rounded-lg shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm transition-all"
                                    placeholder="••••••••" />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" @click="showPassword = !showPassword"
                                        class="text-zinc-400 hover:text-zinc-500 focus:outline-none transition-colors">
                                        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-show="props.loginError" class="text-sm text-red-600 p-2">
                            Invalid password or email
                        </div>
                        <div>
                            <button type="submit"
                                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 active:scale-95"
                                :disabled="isLoading">
                                <span v-if="isLoading" class="flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Signing in...
                                </span>
                                <span v-else>Sign in</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    loginError: boolean
}>();

const emit = defineEmits(['close', 'login']);

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

watch(() => props.loginError, (newVal) => {
    console.log(props.loginError)
    if (!newVal) {
        email.value = '';
        password.value = '';
    }
});

const handleSubmit = () => {
    isLoading.value = true;

    setTimeout(() => {
        isLoading.value = false;

        emit('login', {
            email: email.value,
            password: password.value,
        });
    }, 1000);
};
</script>