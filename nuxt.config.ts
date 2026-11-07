// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    astronomyApiKey: process.env.NUXT_ASTRONOMY_API_KEY,
    public: {
      astronomyApiKey: process.env.NUXT_ASTRONOMY_API_KEY,
    },
  },
})
