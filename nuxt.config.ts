import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@primevue/nuxt-module", "@nuxtjs/tailwindcss"],
  nitro: {
    preset: "bun",
  },
  ssr: false,
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
});
