<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import PageSkeleton from '@/components/details/PageSkeleton.vue'
import AppContainer from '@/components/shared/AppContainer.vue'
import NotFound from './NotFound.vue'
import Borders from '@/components/details/Borders.vue'
import type { Country } from '@/interfaces'
import { Skeleton } from '@/components/ui/skeleton'

const route = useRoute()
const routeName = route.params.name as string
const currentParam = ref(routeName)

const { data, isPending, isError, refetch } = useQuery({
  queryKey: ['country', currentParam.value],
  queryFn: async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${currentParam.value}?fullText=true`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch country data')
      }
      const data = (await response.json()) as Country[]
      return data[0]
    } catch (error) {
      console.error('Error fetching country:', error)
      throw error
    }
  },
  staleTime: Infinity,
  enabled: !!currentParam.value,
})

watch(
  () => route.params.name,
  newName => {
    if (newName && newName !== currentParam.value) {
      currentParam.value = newName as string
      refetch()
    }
  },
)
</script>

<template>
  <main v-if="isPending" class="py-8">
    <AppContainer class="space-y-12 max-lg:max-w-3xl">
      <RouterLink
        to="/"
        class="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-white px-4 text-sm font-thin shadow dark:bg-neutral-dark-blue"
      >
        <ArrowLeft :width="16" /> Back
      </RouterLink>
      <PageSkeleton />
    </AppContainer>
  </main>

  <NotFound v-else-if="isError" />

  <main v-else="data" class="py-8">
    <AppContainer class="space-y-12 max-lg:max-w-3xl">
      <RouterLink
        to="/"
        class="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-white px-4 text-sm font-thin shadow dark:bg-neutral-dark-blue"
      >
        <ArrowLeft :width="16" /> Back
      </RouterLink>

      <div
        class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center"
      >
        <div v-if="data?.flags">
          <img
            :src="data?.flags.svg"
            :alt="data?.name?.common"
            class="aspect-[6/4] w-full rounded object-cover"
          />
        </div>
        <div v-else>
          <Skeleton class="aspect-[6/4] w-full rounded" />
        </div>

        <div class="space-y-8">
          <h1 v-show="data?.name" class="text-2xl font-semibold lg:text-3xl">
            {{ data?.name.common }}
          </h1>

          <div class="gap-8 max-lg:space-y-8 lg:flex lg:items-start">
            <ul class="flex-1 space-y-4">
              <li class="flex items-start gap-2">
                <span class="font-medium">Native Name:</span>
                <span v-show="data?.name" class="text-neutral-dark-gray">{{
                  data?.name.official
                }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Population:</span>
                <span class="text-neutral-dark-gray">{{
                  data?.population?.toLocaleString()
                }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Region:</span>
                <span class="text-neutral-dark-gray">{{ data?.region }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Sub Region:</span>
                <span class="text-neutral-dark-gray">{{
                  data?.subregion
                }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Capital:</span>
                <span class="text-neutral-dark-gray">{{
                  data?.capital?.[0]
                }}</span>
              </li>
            </ul>

            <ul class="flex-1 space-y-4">
              <li class="flex items-start gap-2">
                <span class="font-medium">UN Member:</span>
                <span class="text-neutral-dark-gray">{{
                  data?.unMember ? 'Yes' : 'No'
                }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Currencies:</span>
                <span class="text-neutral-dark-gray">
                  {{
                    data?.currencies &&
                    Object.entries(data?.currencies)
                      .map(([_, curr]) => `${curr.name} (${curr.symbol})`)
                      .join(', ')
                  }}
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span class="font-medium">Languages:</span>
                <span class="text-neutral-dark-gray">
                  {{
                    data?.languages && Object.values(data?.languages).join(', ')
                  }}
                </span>
              </li>
            </ul>
          </div>

          <div class="items-center gap-2 max-lg:space-y-4 lg:flex">
            <h2 class="font-medium">Border Countries:</h2>
            <span v-if="!data?.borders?.length" class="text-neutral-dark-gray">
              No border countries
            </span>
            <Borders v-else :borders="data?.borders" />
          </div>
        </div>
      </div>
    </AppContainer>
  </main>
</template>
