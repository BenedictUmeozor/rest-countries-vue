<script setup lang="ts">
import Country from '@/components/home/Country.vue'
import CountrySkeleton from '@/components/home/CountrySkeleton.vue'
import HomeSearch from '@/components/home/HomeSearch.vue'
import HomeSelect from '@/components/home/HomeSelect.vue'
import AppContainer from '@/components/shared/AppContainer.vue'
import type { Country as CountryInterface } from '@/interfaces'
import { useQuery } from '@tanstack/vue-query'
import { ref, computed } from 'vue'

const { data, isPending, isError } = useQuery({
  queryKey: ['countries'],
  queryFn: async (): Promise<CountryInterface[]> => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    return response.json()
  },
  staleTime: Infinity,
})

const region = ref<string | null>(null)
const query = ref<string | null>(null)

const filteredCountries = computed(() => {
  let result = data.value || []

  if (region.value) {
    result = result.filter(
      country => country.region.toLowerCase() === region.value?.toLowerCase(),
    )
  }

  if (query.value) {
    const q = query.value.toLowerCase()
    result = result.filter(
      country =>
        country.name.common.toLowerCase().includes(q) ||
        country.name.official.toLowerCase().includes(q),
    )
  }

  return result
})

const onRegionChange = (value: string | null) => {
  region.value = value
}
const onQueryChange = (value: string | null) => {
  query.value = value
  console.log(query.value)
}
</script>

<template>
  <main class="py-8">
    <AppContainer class="space-y-12">
      <div
        class="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <HomeSearch @search="onQueryChange($event)" />
        <HomeSelect @update="onRegionChange($event)" />
      </div>
      <div
        v-if="isPending"
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <CountrySkeleton v-for="n in 10" :key="n" />
      </div>
      <div v-else-if="isError" class="grid h-80 place-items-center">
        <h2 class="text-base font-medium text-red-600">
          There is a problem with the server. Try again later
        </h2>
      </div>
      <div
        v-else
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <Country
          v-for="country in filteredCountries"
          :key="country.name.common"
          :country="country"
        />
      </div>
    </AppContainer>
  </main>
</template>
