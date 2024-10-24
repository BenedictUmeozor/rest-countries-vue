<script setup lang="ts">
import { Skeleton } from '../ui/skeleton'
</script>

<template>
  <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center">
    <div class="aspect-[6/4] w-full rounded">
      <Skeleton class="h-full w-full" />
    </div>
    <div class="space-y-8">
      <Skeleton class="h-8 w-1/4" />
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
        <div class="flex items-center gap-2">
          <Skeleton class="h-8 w-1/4" />
          <Skeleton class="h-8 w-2/4" />
        </div>
      </div>
    </div>
  </div>
</template>
