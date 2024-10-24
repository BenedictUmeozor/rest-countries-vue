<script setup lang="ts">
import { useTheme } from '@/composables/theme'
import { provide } from 'vue'

const { theme, toggleTheme } = useTheme()

provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
