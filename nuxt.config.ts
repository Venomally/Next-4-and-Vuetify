export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      astronomyApiKey: process.env.ASTRONOMY_API_KEY || 'tvoj_kljuc_ovde'
    }
  }
})