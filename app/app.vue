<script setup>
import { ref, onMounted } from 'vue'

const astronomyData = ref(null)
const loading = ref(true)
const errorMessage = ref(null)

const config = useRuntimeConfig()
const apiKey = config.public.astronomyApiKey

const fetchData = async () => {
  try {
    const myHeaders = new Headers()
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    }

    const response = await fetch(
        `https://api.ipgeolocation.io/v3/astronomy?apiKey=${useRuntimeConfig().astronomyApiKey}&location=New%20York&elevation=10`,
      requestOptions
    )
    
    if (!response.ok) {
      throw new Error(`Greška: ${response.status}`)
    }

    // Pretvaramo tekst u JSON objekat da bismo lakše čitali podatke
    const result = await response.json()
    astronomyData.value = result
  } catch (error) {
    console.error(error)
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="mt-5">
        <v-card class="pa-5 elevation-3">
          <v-card-title class="text-h5 font-weight-bold text-primary">
            Astronomi podaci (fetch + Vuetify)
          </v-card-title>
          
          <v-card-text>
            <!-- Učitavanje -->
            <div v-if="loading" class="d-flex justify-center my-4">
              <v-progress-circular indeterminate color="primary" />
            </div>

            <!-- Greška -->
            <v-alert v-else-if="errorMessage" type="error" title="Došlo je do greške">
              {{ errorMessage }}
            </v-alert>

            <!-- Prikaz rezultata -->
            <div v-else-if="astronomyData">
              <p><strong>Lokacija:</strong> {{ astronomyData.location }}</p>
              <p><strong>Izlazak sunca:</strong> {{ astronomyData.sunrise }}</p>
              <p><strong>Zalazak sunca:</strong> {{ astronomyData.sunset }}</p>
              <p><strong>Dužina dana:</strong> {{ astronomyData.day_length }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>