<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const emit = defineEmits<{ (e: 'search', term: string): void }>()

const term = ref('')

const handleSearch = useDebounceFn(() => {
  emit('search', term.value)
}, 300)

watch(term, () => handleSearch())
</script>

<template>
  <div class="relative h-12 w-full shadow lg:max-w-md">
    <input
      type="text"
      class="h-full w-full rounded-md bg-neutral-white pl-14 pr-4 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-neutral-dark-blue"
      placeholder="Search for a country..."
      v-model="term"
    />
    <SearchIcon
      class="absolute left-4 top-1/2 w-5 -translate-y-1/2 transform"
    />
  </div>
</template>
