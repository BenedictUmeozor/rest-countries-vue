<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = withDefaults(defineProps<{ class?: string }>(), {
  class: '',
})
</script>

<template>
  <div :class="cn('container mx-auto max-w-7xl px-4 md:px-8', props.class)">
    <slot></slot>
  </div>
</template>
