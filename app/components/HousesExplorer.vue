<template>
  <div class="mx-auto w-full max-w-7xl">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="lg:pr-2">
        <div v-if="pending" class="text-sm text-gray-500">Loading houses…</div>
        <div v-else-if="error" class="text-sm text-red-600">
          Failed to load houses.
        </div>
        <HousesList v-else v-model="selectedHouseId" :houses="houses" />
      </div>

      <div class="lg:pl-2">
        <div class="sticky top-4 h-[80vh] lg:h-[calc(100vh-100px)]">
          <HousesMap
            v-model="selectedHouseId"
            :markers="markers"
            :center="mapCenter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { House } from '~/types';
import type { LatLong } from '~/utils/geo';
import { getCityLatLong } from '~/utils/geo';

const { selectedHouseId } = useHouseSelection();

const { data, pending, error } = await useFetch<House[]>('/api/houses');

const houses = computed(() => data.value ?? []);

const markers = computed(() =>
  houses.value
    .map((h) => {
      const latlong = getCityLatLong(h.city);
      if (!latlong) return null;

      const reviewsCount = h.reviews.length;
      const rating =
        reviewsCount === 0
          ? null
          : h.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount;

      return {
        id: h.id,
        latlong,
        house: h,
        rating,
        reviewsCount,
      };
    })
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
);

const mapCenter = computed<LatLong>(() => {
  const selected = markers.value.find((m) => m.id === selectedHouseId.value);
  if (selected) {
    const [lat, lng] = selected.latlong;
    // Offset the center slightly North (higher latitude) so the marker
    // appears closer to the bottom, leaving room for the popup.
    return [lat + 3, lng];
  }
  return [40.4168, -3.7038] as const;
});
</script>
