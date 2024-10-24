<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue'
import ThemeProvider from './providers/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <AppHeader />
    <RouterView />
    <footer class="py-8 text-center text-sm text-neutral-dark-gray">
      &copy; {{ new Date().getFullYear() }}
      <a
        href="https://benedictumeozor.vercel.app"
        target="_blank"
        class="hover:underline"
      >
        Benedict
      </a>
    </footer>
  </ThemeProvider>
</template>
