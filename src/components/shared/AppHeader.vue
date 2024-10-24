<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppContainer from './AppContainer.vue'
import { inject } from 'vue'
import type { Theme } from '@/composables/theme'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const theme = inject<Theme>('theme')
const toggleTheme = inject<() => void>('toggleTheme')
</script>

<template>
  <header
    class="grid min-h-20 place-items-center bg-neutral-white shadow dark:bg-neutral-dark-blue"
  >
    <AppContainer class="flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-lg font-bold tracking-wide sm:text-xl md:text-2xl lg:text-3xl"
      >
        Where in the world?
      </RouterLink>

      <button
        v-if="theme === 'dark'"
        class="inline-flex items-center gap-2"
        @click="toggleTheme"
      >
        <SunIcon class="w-4 fill-white" /> Light mode
      </button>
      <button
        v-else
        @click="toggleTheme"
        class="inline-flex items-center gap-2"
      >
        <MoonIcon class="w-4 fill-white" /> Dark mode
      </button>
    </AppContainer>
  </header>
</template>
