<template>
  <div class="mx-auto w-full max-w-5xl px-4 py-8">
    <div class="mb-8">
      <NuxtLink
        to="/"
        class="text-sm font-medium text-gray-600 hover:underline"
      >
        ← Volver
      </NuxtLink>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900">
        Confirmar y pagar
      </h1>
    </div>

    <div v-if="booking" class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <!-- Left Column: Checkout Info -->
      <div class="space-y-10">
        <section>
          <h2 class="text-xl font-semibold text-gray-900">Tu viaje</h2>
          <div class="mt-4 space-y-4">
            <div class="flex justify-between">
              <div>
                <p class="font-medium text-gray-900">Fechas</p>
                <p class="text-gray-600">{{ formattedDates }}</p>
              </div>
              <button class="text-sm font-semibold text-gray-900 underline">
                Editar
              </button>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="font-medium text-gray-900">Huéspedes</p>
                <p class="text-gray-600">{{ booking.guests }} huésped</p>
              </div>
              <button class="text-sm font-semibold text-gray-900 underline">
                Editar
              </button>
            </div>
          </div>
        </section>

        <section class="border-t pt-10">
          <h2 class="text-xl font-semibold text-gray-900">Pagar con</h2>
          <div class="mt-6 space-y-4">
            <div
              class="flex items-center justify-between rounded-xl border border-gray-300 p-4"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-8 w-12 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase"
                >
                  Card
                </div>
                <span class="font-medium text-gray-900">•••• 4242</span>
              </div>
              <button class="text-sm font-semibold text-gray-900 underline">
                Editar
              </button>
            </div>
          </div>
        </section>

        <section class="border-t pt-10">
          <h2 class="text-xl font-semibold text-gray-900">
            Política de cancelación
          </h2>
          <p class="mt-4 text-gray-600">
            Cancelación gratuita antes de 48 horas. Después de eso, cancela
            antes de la fecha de llegada para obtener un reembolso total, menos
            la primera noche y la comisión de servicio.
          </p>
        </section>

        <div class="pt-6">
          <button
            class="w-full rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
            @click="handlePay"
          >
            Confirmar y pagar
          </button>
        </div>
      </div>

      <!-- Right Column: Order Summary -->
      <div>
        <div
          class="sticky top-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex gap-4">
            <div
              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
            >
              <NuxtImg
                :src="booking.house.image.replace('/images/', '')"
                class="h-full w-full object-cover"
                :alt="booking.house.name"
              />
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <p
                  class="text-xs text-gray-500 uppercase tracking-wider font-semibold"
                >
                  {{ booking.house.city }}
                </p>
                <h3 class="text-sm font-medium text-gray-900">
                  {{ booking.house.name }}
                </h3>
              </div>
              <div class="text-xs text-gray-500">★ 4.95 (128 evaluaciones)</div>
            </div>
          </div>

          <div class="mt-6 border-t pt-6">
            <h3 class="text-lg font-semibold text-gray-900">
              Información del precio
            </h3>
            <div class="mt-4 space-y-3">
              <div class="flex justify-between text-gray-600">
                <span>{{ booking.house.price }}€ x {{ nights }} noches</span>
                <span>{{ totalPrice }}€</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Comisión de servicio</span>
                <span>{{ serviceFee }}€</span>
              </div>
              <div
                class="flex justify-between border-t pt-3 font-semibold text-gray-900"
              >
                <span>Total (EUR)</span>
                <span>{{ finalTotal }}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="py-20 text-center">
      <h2 class="text-2xl font-semibold text-gray-900">
        No hay ninguna reserva seleccionada
      </h2>
      <p class="mt-2 text-gray-600">Por favor, selecciona una casa primero.</p>
      <NuxtLink
        to="/"
        class="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Explorar casas
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { booking } = useBookings();

const formattedDates = computed(() => {
  if (!booking.value) return '';
  const { start, end } = booking.value.dates;
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };
  return `${start.toLocaleDateString(
    'es-ES',
    options
  )} – ${end.toLocaleDateString('es-ES', options)}`;
});

const nights = computed(() => {
  if (!booking.value) return 0;
  const { start, end } = booking.value.dates;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const totalPrice = computed(() => {
  if (!booking.value) return 0;
  return booking.value.house.price * nights.value;
});

const serviceFee = computed(() => Math.round(totalPrice.value * 0.12));
const finalTotal = computed(() => totalPrice.value + serviceFee.value);

const handlePay = () => {
  alert('¡Reserva realizada con éxito! (Esto es un demo)');
};
</script>
