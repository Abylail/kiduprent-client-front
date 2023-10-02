// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: undefined,
  experimental: undefined,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo-reverse.svg' }
      ],
      script: [
        {src: '/yandex.js'}
      ]
    },
  },
  css: ["~/assets/styles/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`
        }
      }
    },
  },

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL,
      CDN_URL: process.env.CDN_URL,
    }
  },

  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
  ],
})
