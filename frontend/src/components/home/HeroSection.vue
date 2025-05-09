<template>
    <section class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
  
          <div class="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="sm:text-center lg:text-left">
                <h1 class="text-4xl tracking-tight font-extrabold text-zinc-900 sm:text-5xl md:text-6xl">
                  <span class="block xl:inline">Modern inventory</span>
                  <span class="block text-black xl:inline"> for your station</span>
                </h1>
                <p
                  class="mt-3 text-base text-zinc-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Streamline your gasoline station operations with our comprehensive inventory management system. Track
                  fuel levels, manage stock, and generate reports with ease.
                </p>
                <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div class="rounded-md shadow">
                    <button
                      @click="$emit('open-login')"
                      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-zinc-800 md:py-4 md:text-lg md:px-10 transition-all duration-300 active:scale-95"
                    >
                      Get started
                    </button>
                  </div>
                  <div class="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#features"
                      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-zinc-900 bg-zinc-100 hover:bg-zinc-200 md:py-4 md:text-lg md:px-10 transition-all duration-300 active:scale-95"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Gasoline station"
        />
      </div>
    </section>
</template>
  
<script setup lang="ts">
defineEmits(['open-login']);
</script>