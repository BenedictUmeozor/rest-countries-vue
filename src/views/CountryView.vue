<script setup lang="ts">
import type { Country } from '@/interfaces'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import NotFound from './NotFound.vue'
import AppContainer from '@/components/shared/AppContainer.vue'
import { ArrowLeft } from 'lucide-vue-next'
import PageSkeleton from '@/components/details/PageSkeleton.vue'
import Borders from '@/components/details/Borders.vue'

const props = defineProps<{ name: string }>()
const router = useRouter()

const { data, isFetching, isError, refetch } = useQuery({
  queryKey: ['country', props.name],
  queryFn: async (): Promise<Country[]> => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${props.name}?fullText=true`,
    )
    return response.json()
  },
  staleTime: Infinity,
})

watch(
  () => props.name,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      refetch()
    }
  },
)
</script>

<template>
  <main v-if="!isError" class="py-8">
    <AppContainer class="space-y-12 py-8 max-lg:max-w-3xl">
      <button
        @click="router.go(-1)"
        class="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-white px-4 text-sm font-thin shadow dark:bg-neutral-dark-blue"
      >
        <ArrowLeft class="w-4" />
        Back
      </button>
      <PageSkeleton v-if="isFetching || !data" />
      <section
        v-else
        class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <img
            :src="data[0].flags.svg"
            :alt="data[0].name.common"
            className="aspect-[6/4] w-full rounded object-cover"
          />
        </div>
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold lg:text-3xl">
            {{ data[0].name.common }}
          </h1>
          <div className="gap-8 max-lg:space-y-8 lg:flex lg:items-start">
            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-2">
                Native Name:
                <span className="text-neutral-dark-gray">
                  {{ data[0].name.official }}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Population:
                <span className="text-neutral-dark-gray">
                  {{ data[0].population }}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Region:
                <span className="text-neutral-dark-gray">{{
                  data[0].region
                }}</span>
              </li>
              <li className="flex items-start gap-2">
                Sub Region:
                <span className="text-neutral-dark-gray">
                  {{ data[0].subregion }}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Capital:
                <span className="text-neutral-dark-gray">
                  {{ data[0].capital[0] }}
                </span>
              </li>
            </ul>

            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-2">
                UN Member:
                <span className="text-neutral-dark-gray">
                  {{ data[0].unMember ? 'Yes' : 'No' }}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Currencies:
                <span className="text-neutral-dark-gray">
                  {{
                    data[0].currencies &&
                    Object.keys(data[0].currencies)
                      .map(
                        key => `${data?.[0].currencies[key].name}
                  (${data?.[0].currencies[key].symbol})`,
                      )
                      .join(', ')
                  }}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Languages:
                <span className="text-neutral-dark-gray">
                  {{ Object.values(data[0].languages).join(', ') }}
                </span>
              </li>
            </ul>
          </div>

          <div className="items-center gap-2 max-lg:space-y-4 lg:flex">
            <h2>Border Countries:</h2>
            <Borders
              v-if="data[0].borders && data[0].borders.length"
              :borders="data[0].borders"
            />
            <span v-else className="text-neutral-dark-gray">
              No border countries
            </span>
          </div>
        </div>
      </section>
    </AppContainer>
  </main>
  <NotFound v-else />
</template>
