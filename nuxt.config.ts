// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/supabase'],

    css: ['~/assets/css/main.css'],
    
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },

    runtimeConfig: {
        public: {
          apiBase: process.env.API_BASE,
        }
    },

    app: {
      head: {
        title: 'BookWard | Social Network for Book Lovers',
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ]
      },
    }
})
