<script setup lang="ts">
import type { Country } from '@/interfaces'
import { useQueries, useQueryClient } from '@tanstack/vue-query'
import { RouterLink } from 'vue-router'

const { borders } = defineProps<{ borders: string[] }>()

const fetchCountry = async (border: string): Promise<Country> => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
  const data = (await response.json()) as Country[]
  return data[0]
}

const queryClient = useQueryClient()

const results = useQueries({
  queries: borders.map(border => ({
    queryKey: ['border', border],
    queryFn: () => fetchCountry(border),
  })),
  combine: results => {
    return {
      data: results.map(result => result.data),
      isPending: results.some(result => result.isPending),
    }
  },
})

const prefetch = (name?: string) => {
  if (name) {
    queryClient.prefetchQuery({
      queryKey: ['border', name],
      queryFn: async (): Promise<Country[]> => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`,
        )
        return res.json()
      },
    })
  }
}
</script>

<template>
  <ul class="flex flex-wrap gap-2 gap-y-4" v-if="results.data">
    <li
      v-for="country in results.data"
      :key="country?.name.common"
      class="text-neutral-dark-gray"
    >
      <RouterLink
        :to="`/countries/${country?.name.common}`"
        class="rounded bg-neutral-white p-2 text-sm shadow dark:bg-neutral-dark-blue"
        @onmouseover="prefetch(country?.name.common)"
        >{{ country?.name.common || 'loading...' }}</RouterLink
      >
    </li>
  </ul>
</template>
