<template>
  <div class="mx-auto w-full max-w-4xl">
    <div class="mb-4">
      <NuxtLink to="/" class="text-sm text-gray-600 hover:text-gray-900">
        ← Volver
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-sm text-gray-500">Loading…</div>
    <div v-else-if="error" class="text-sm text-red-600">House not found.</div>

    <article v-else-if="house" class="space-y-6 pt-6">
      <header class="space-y-2">
        <h1 class="text-4xl font-semibold tracking-tight">{{ house.name }}</h1>
        <p class="text-gray-600">
          {{ house.address }} · {{ house.city }}, {{ house.country }}
        </p>
      </header>

      <div
        class="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100"
      >
        <NuxtImg
          class="h-full w-full object-cover"
          :src="house.image.replace('/images/', '')"
          :alt="house.name"
          placeholder
        />
      </div>

      <section class="rounded-2xl border border-gray-200 bg-white p-4">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <div class="text-gray-700">
            <span class="font-semibold text-gray-900">{{ house.price }}€</span>
            <span class="text-gray-500"> / noche</span>
          </div>
          <div class="text-sm text-gray-700">
            {{ house.bedrooms }} hab. · {{ house.beds }} camas ·
            {{ house.bathrooms }} baños
          </div>
        </div>
        <p class="mt-3 text-gray-700">{{ house.description }}</p>
        <div class="mt-6 border-t pt-6">
          <button
            @click="handleBooking"
            class="w-full rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
          >
            Reserva ahora
          </button>
        </div>
      </section>

      <section class="rounded-2xl border border-gray-200 bg-white p-4">
        <h2 class="text-lg font-semibold">Amenities</h2>
        <ul class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <li v-for="a in house.amenities" :key="a" class="text-gray-700">
            {{ a }}
          </li>
        </ul>
      </section>

      <section class="rounded-2xl border border-gray-200 bg-white p-4">
        <h2 class="text-lg font-semibold">Reviews</h2>
        <p v-if="house.reviews.length === 0" class="mt-2 text-gray-600">
          No reviews yet.
        </p>
        <ul v-else class="mt-3 space-y-3">
          <li
            v-for="r in house.reviews"
            :key="r.id"
            class="rounded-xl bg-gray-50 p-3"
          >
            <ReviewCard :review="r" />
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { House } from '~/types';

const route = useRoute();
const id = computed(() => String(route.params.id ?? ''));

const {
  data: house,
  pending,
  error,
} = await useFetch<House>(() => `/api/houses/${id.value}`, { watch: [id] });

const { setBooking } = useBookings();
const router = useRouter();

const handleBooking = () => {
  if (house.value) {
    setBooking(house.value);
    router.push('/booking');
  }
};
</script>
