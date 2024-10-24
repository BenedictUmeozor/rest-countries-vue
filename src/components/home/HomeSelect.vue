<script setup lang="ts">
import { REGIONS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { onUnmounted, ref, useTemplateRef } from 'vue'

const emit = defineEmits<{ (e: 'update', value: string | null): void }>()

const open = ref<boolean>(false)
const selectedRegion = ref<string | null>(null)
const select = useTemplateRef('my-select')

const handleClickOutside = (event: MouseEvent) => {
  if (select.value && !select.value.contains(event.target as Node)) {
    open.value = false
  }
}

document.addEventListener('click', handleClickOutside)

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleOpen = () => (open.value = !open.value)

const selectRegion = (region: string) => {
  selectedRegion.value = selectedRegion.value === region ? null : region
  open.value = false
  emit('update', region)
}
</script>

<template>
  <div class="relative h-12 w-56">
    <div
      class="flex h-full cursor-pointer items-center justify-between rounded-md bg-neutral-white px-4 shadow dark:bg-neutral-dark-blue"
      @click="toggleOpen"
      ref="my-select"
    >
      {{ selectedRegion || 'Filter by Region' }}
      <ChevronDown
        :class="cn('w-4 transition-transform', open && 'rotate-180')"
      />
    </div>
    <ul
      v-show="open"
      :class="
        cn(
          'absolute left-0 top-14 z-20 w-full rounded-md bg-neutral-white py-2 shadow dark:bg-neutral-dark-blue',
        )
      "
    >
      <li
        v-for="region in REGIONS"
        :key="region"
        :class="
          cn(
            'cursor-pointer px-6 py-2 capitalize transition-colors hover:text-gray-400 dark:hover:text-gray-400',
            selectedRegion === region && 'text-gray-400',
          )
        "
        @click="selectRegion(region)"
      >
        {{ region }}
      </li>
    </ul>
  </div>
</template>
