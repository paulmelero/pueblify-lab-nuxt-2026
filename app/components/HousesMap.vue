<template>
  <section
    class="relative h-full w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
  >
    <ClientOnly>
      <MapboxMap
        map-id="houses-map"
        class="absolute inset-0"
        :options="mapOptions"
      >
        <HouseMarker
          v-for="m in markers"
          :key="m.id"
          :marker-id="`house-${m.id}`"
          :lnglat="toLngLat(m.latlong)"
          :house="m.house"
          :rating="m.rating"
          :reviews-count="m.reviewsCount"
          :is-selected="m.id === selectedId"
          @select="selectedId = m.id"
          @close="selectedId = null"
        />
      </MapboxMap>
    </ClientOnly>

    <div
      v-if="!hasToken"
      class="absolute inset-0 flex items-center justify-center p-6 text-center"
    >
      <div
        class="max-w-md rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"
      >
        <div class="font-semibold">Mapbox access token missing</div>
        <div class="mt-1 text-sm text-amber-900/80">
          Set <code class="font-mono">NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> (or
          <code class="font-mono">MAPBOX_ACCESS_TOKEN</code>) and restart dev
          server.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LatLong } from '~/utils/geo';
import { toLngLat } from '~/utils/geo';
import type { House } from '~/types';

type HouseMarker = {
  id: string;
  latlong: LatLong;
  house: House;
  rating: number | null;
  reviewsCount: number;
};

const props = defineProps<{
  markers: HouseMarker[];
  center?: LatLong;
}>();

const selectedId = defineModel<string | null>();

const runtimeConfig = useRuntimeConfig();
const hasToken = computed(() =>
  Boolean(runtimeConfig.public?.mapboxAccessToken)
);

const mapOptions = computed(() => ({
  style: 'mapbox://styles/mapbox/streets-v12',
  // Madrid (default)
  center: toLngLat(props.center ?? ([40.4168, -3.7038] as const)),
  zoom: 4,
  cooperativeGestures: true,
}));
</script>
