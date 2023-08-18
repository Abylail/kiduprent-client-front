// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, , maximum-scale=1",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo-reverse.svg' }
      ],
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
    }
  },

  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt'
  ],
})
