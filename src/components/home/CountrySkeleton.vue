<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
</script>

<template>
  <div class="rounded-md max-sm:mx-auto max-sm:w-3/4">
    <div class="aspect-[6.5/4]">
      <Skeleton class="h-full w-full" />
    </div>
    <div class="space-y-4 bg-neutral-white p-4 dark:bg-neutral-dark-blue">
      <Skeleton class="h-4 w-3/4" />
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Skeleton class="h-4 w-1/4" />
          <Skeleton class="h-4 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-4 w-1/4" />
          <Skeleton class="h-4 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-4 w-1/4" />
          <Skeleton class="h-4 w-2/4" />
        </div>
      </div>
    </div>
  </div>
</template>
