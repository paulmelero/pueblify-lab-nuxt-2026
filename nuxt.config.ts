// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 4444,
  },
  css: ['mapbox-gl/dist/mapbox-gl.css'],
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', 'nuxt-mapbox'],
  image: {
    dir: 'assets/img',
  },
  features: {
    inlineStyles: true,
  },
  mapbox: {
    accessToken:
      process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN ??
      process.env.MAPBOX_ACCESS_TOKEN ??
      '',
  },
  runtimeConfig: {
    public: {
      mapboxAccessToken:
        process.env.NUXT_PUBLIC_MAPBOX_ACCESS_TOKEN ??
        process.env.MAPBOX_ACCESS_TOKEN ??
        '',
    },
  },
});
