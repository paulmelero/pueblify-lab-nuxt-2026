<template>
  <section class="flex flex-col gap-3">
    <div class="flex items-end justify-between gap-3">
      <form class="w-full flex-1 flex items-center justify-between gap-2">
        <search class="w-full">
          <label for="search" class="sr-only">Buscar casa</label>
          <input
            type="text"
            id="search"
            v-model="filter"
            placeholder="Buscar casa"
            class="w-full p-2 rounded-md border border-gray-300"
          />
        </search>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">
          Buscar
        </button>
      </form>
      <div class="text-sm text-gray-500 whitespace-nowrap">
        {{ filteredHouses.length }} alojamientos
      </div>
    </div>

    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="house in filteredHouses"
        :key="house.id"
        class="rounded-xl border bg-white overflow-hidden transition hover:shadow-sm"
        :class="house.id === selectedId ? 'border-gray-900' : 'border-gray-200'"
      >
        <button
          type="button"
          class="w-full text-left"
          @click="selectHouse(house.id)"
        >
          <div class="flex gap-4 p-3">
            <div
              class="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100"
            >
              <NuxtImg
                class="h-full w-full object-cover"
                :src="house.image.replace('/images/', '')"
                :alt="house.name"
                placeholder
              />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h2 class="truncate font-medium text-gray-900">
                    {{ house.name }}
                  </h2>
                  <p class="truncate text-sm text-gray-600">
                    {{ house.city }}, {{ house.country }}
                  </p>
                </div>

                <div class="shrink-0 text-right">
                  <div class="font-semibold text-gray-900">
                    {{ house.price }}€
                  </div>
                  <div class="text-xs text-gray-500">noche</div>
                </div>
              </div>

              <div class="mt-2 text-sm text-gray-600">
                <span class="whitespace-nowrap">{{ house.bedrooms }} hab.</span>
                <span class="px-2 text-gray-300">·</span>
                <span class="whitespace-nowrap">{{ house.beds }} camas</span>
                <span class="px-2 text-gray-300">·</span>
                <span class="whitespace-nowrap"
                  >{{ house.bathrooms }} baños</span
                >
              </div>
            </div>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { House } from '~/types';

const props = defineProps<{
  houses: House[];
}>();

const selectedId = defineModel<string | null>();

const filter = ref('');

const filteredHouses = computed(() => {
  if (!filter.value) return props.houses;

  return props.houses.filter((house: House) =>
    house.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

const selectHouse = (houseId: string) => {
  selectedId.value = houseId;
};
</script>
