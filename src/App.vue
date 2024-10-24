<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/shared/AppHeader.vue'
import ThemeProvider from './providers/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <AppHeader />
    <RouterView />
  </ThemeProvider>
</template>
