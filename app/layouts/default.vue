<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="px-2 py-4">
      <slot />
    </main>
    <footer class="mt-auto py-4 px-2 text-center">
      <span class="text-gray-500 m-auto w-full">Pueblify</span>
    </footer>
  </div>
</template>
