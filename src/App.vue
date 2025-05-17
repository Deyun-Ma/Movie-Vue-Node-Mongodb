<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// Update document title based on route
const pageTitle = computed(() => {
  const baseTitle = 'MovieMind'
  const routeTitle = route.meta.title as string
  return routeTitle ? `${routeTitle} | ${baseTitle}` : baseTitle
})

watch(pageTitle, (newTitle) => {
  document.title = newTitle
})

// Check if user is already logged in (from localStorage)
authStore.checkAuth()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>