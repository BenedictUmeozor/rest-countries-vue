<script setup lang="ts">
import type { Country } from '@/interfaces'
import { useQueryClient } from '@tanstack/vue-query'
import { RouterLink } from 'vue-router'

const { country } = defineProps<{ country: Country }>()

const queryClient = useQueryClient()

const prefetch = () =>
  queryClient.prefetchQuery({
    queryKey: ['country', country.name.common],
    queryFn: async (): Promise<Country[]> => {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`,
      )
      return res.json()
    },
    staleTime: Infinity,
  })
</script>

<template>
  <RouterLink
    :to="`/countries/${country.name.common}`"
    class="rounded-md transition-transform duration-200 ease-linear hover:scale-105 max-sm:mx-auto max-sm:w-3/4"
    @mouseover="prefetch"
  >
    <img
      :src="country.flags.svg"
      :alt="country.name.common"
      class="aspect-[6.5/4] w-full max-w-full object-cover"
    />
    <div class="space-y-4 bg-neutral-white p-4 dark:bg-neutral-dark-blue">
      <h3 class="line-clamp-1 text-lg font-semibold">
        {{ country.name.common }}
      </h3>
      <ul class="space-y-2">
        <li class="flex items-center gap-2">
          Population:
          <span class="text-neutral-dark-gray">{{ country.population }}</span>
        </li>
        <li class="flex items-center gap-2">
          Region:
          <span class="text-neutral-dark-gray">{{ country.region }}</span>
        </li>
        <li class="flex items-center gap-2">
          Capital:
          <span class="line-clamp-1 text-neutral-dark-gray">
            {{ country.capital?.[0] }}
          </span>
        </li>
      </ul>
    </div>
  </RouterLink>
</template>
