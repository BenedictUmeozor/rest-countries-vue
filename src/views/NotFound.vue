<script setup lang="ts">
import { ArrowLeft, Compass, MapPin } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-neutral-very-light-gray dark:bg-neutral-very-dark-blue"
  >
    <div class="w-full max-w-lg px-6 py-8 text-center">
      <div class="relative">
        <h1
          class="mb-2 text-8xl font-extrabold text-neutral-dark-blue dark:text-white"
        >
          404
        </h1>
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <Compass
            class="animate-spin-slow h-20 w-20 text-neutral-dark-gray dark:text-neutral-dark-blue"
          />
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <h2
          class="text-2xl font-semibold text-neutral-very-dark-blue-light dark:text-white"
        >
          Lost in Navigation
        </h2>
        <p class="text-neutral-dark-gray dark:text-neutral-very-light-gray">
          The page you're looking for seems to have wandered off the map.
        </p>
      </div>

      <div class="mb-8 mt-8 flex justify-center">
        <MapPin
          class="h-8 w-8 animate-bounce text-neutral-dark-gray dark:text-white"
        />
      </div>

      <RouterLink
        to="/"
        class="inline-flex items-center rounded-lg bg-neutral-dark-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-opacity-90 dark:bg-neutral-dark-blue"
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Homepage
      </RouterLink>
    </div>
  </div>
</template>
