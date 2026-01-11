<template>
  <div
    ref="markerEl"
    class="flex flex-col items-center absolute"
    hidden
    :class="isSelected ? 'z-[2]' : 'z-[1]'"
  >
    <!-- Price tag (collapsed state) -->
    <template v-if="!isSelected">
      <div class="relative">
        <div
          class="h-2 w-2 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-white bg-white shadow-sm"
        ></div>
        <button
          type="button"
          class="flex items-center justify-center rounded-full border-2 border-white bg-white px-2 py-1 font-semibold text-gray-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-gray-900 hover:text-white active:scale-95 relative z-[1]"
          @click="emit('select')"
        >
          <span class="text-xs">{{ house.price }}€</span>
        </button>
      </div>
    </template>

    <!-- Popup card (expanded state) -->
    <template v-else>
      <div
        class="w-[200px] rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden isolate z-[2]"
      >
        <!-- Close button -->
        <button
          type="button"
          class="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm hover:bg-white hover:text-gray-900"
          @click="emit('close')"
        >
          <span class="text-sm font-bold">×</span>
        </button>

        <!-- Image -->
        <div class="relative h-28 w-full bg-gray-100">
          <NuxtImg
            class="h-full w-full object-cover"
            :src="house.image.replace('/images/', '')"
            :alt="house.name"
            placeholder
          />
        </div>

        <!-- Content -->
        <div class="p-3">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <div class="truncate font-semibold text-gray-900">
                {{ house.name }}
              </div>
              <div class="truncate text-sm text-gray-600">
                {{ house.city }}, {{ house.country }}
              </div>
            </div>
            <div class="shrink-0 text-right">
              <div class="font-semibold text-gray-900">{{ house.price }}€</div>
              <div class="text-xs text-gray-500">noche</div>
            </div>
          </div>

          <div class="mt-2 text-sm text-gray-700">
            <span>{{ house.bedrooms }} hab.</span>
            <span class="px-2 text-gray-300">·</span>
            <span>{{ house.beds }} camas</span>
            <span class="px-2 text-gray-300">·</span>
            <span>{{ house.bathrooms }} baños</span>
          </div>

          <div v-if="rating !== null" class="mt-1 text-sm text-gray-700">
            <span class="font-semibold">{{ rating.toFixed(1) }}</span>
            <span class="text-gray-500"> ({{ reviewsCount }} reseñas)</span>
          </div>

          <NuxtLink
            class="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            :to="`/houses/${house.id}`"
          >
            Ver detalles
          </NuxtLink>
        </div>
      </div>
      <!-- Pointer arrow for popup -->
      <div
        class="h-3 w-3 -mt-1.5 rotate-45 border-r border-b border-gray-200 bg-white shadow-sm"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl';
import type { House } from '~/types';

const props = defineProps<{
  markerId: string;
  lnglat: LngLatLike;
  house: House;
  rating: number | null;
  reviewsCount: number;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  (e: 'select'): void;
  (e: 'close'): void;
}>();

const markerEl = ref<HTMLElement | null>(null);

defineMapboxMarker(
  props.markerId,
  {
    lnglat: props.lnglat,
    anchor: 'bottom',
  },
  markerEl
);
</script>
