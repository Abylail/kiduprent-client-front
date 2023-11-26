// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/api-client/**': {
        proxy: process.env.BACKEND_URL_PROXY + "/**"
      },
    },
    compressPublicAssets: true,
  },

  experimental: undefined,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      "apple-touch-icon": "/logo-reverse.svg",
      script: [
        {
          hid: "gtm",
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NTQJ684F');`,
          defer: true
        }
      ],
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
    // 'nuxt-delay-hydration',
    '@nuxt/image',
    'nuxt-lazy-load'
  ],

  image: {
    dir: 'assets/images',
  },

  delayHydration: {
    debug: process.env.NODE_ENV === "development",
    mode: "init",
    postIdleTimeout: {
      mobile: 1000,
      desktop: 1000
    }
  }
})
