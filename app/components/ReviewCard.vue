<template>
  <div class="flex items-baseline justify-between gap-3">
    <div class="font-semibold text-gray-900">{{ review.author }}</div>
    <div class="text-sm text-gray-600">
      {{ formattedDate }} · {{ review.rating }}/5
    </div>
  </div>
  <p class="mt-2 text-gray-700">{{ review.comment }}</p>
</template>

<script setup lang="ts">
import type { Review } from '~/types';

const props = defineProps<{
  review: Review;
}>();

const formattedDate = computed(() => {
  return new Date(props.review.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>
