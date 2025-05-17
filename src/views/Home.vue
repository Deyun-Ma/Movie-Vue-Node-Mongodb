<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isAuthenticated = ref(authStore.isAuthenticated)

const featuredMovies = ref([
  {
    id: 1,
    title: 'Inception',
    poster: 'https://images.pexels.com/photos/8892/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 4.8,
    genre: ['Science Fiction', 'Action', 'Thriller']
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    poster: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 4.9,
    genre: ['Drama']
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: 'https://images.pexels.com/photos/2120310/pexels-photo-2120310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 4.7,
    genre: ['Action', 'Crime', 'Drama']
  }
])

const navigateToMovies = () => {
  if (isAuthenticated.value) {
    router.push({ name: 'movies' })
  } else {
    router.push({ name: 'login' })
  }
}

onMounted(() => {
  // Update authentication status
  isAuthenticated.value = authStore.isAuthenticated
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[80vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1280" 
          alt="Movie Theater" 
          class="w-full h-full object-cover brightness-50"
        />
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover Your Next Favorite Movie
          </h1>
          <p class="mt-6 text-xl text-white/90">
            Personalized recommendations, curated collections, and a community of fellow movie enthusiasts.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <button 
              @click="navigateToMovies" 
              class="btn-primary text-base flex items-center"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <a href="#features" class="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Movies -->
    <section class="py-16 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-900">Featured Movies</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Explore our handpicked selection of must-watch films across various genres
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="movie in featuredMovies" 
            :key="movie.id" 
            class="card group hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
              <img 
                :src="movie.poster" 
                :alt="movie.title" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute top-3 right-3 bg-primary-500 text-white rounded-full px-2 py-1 text-sm font-medium">
                {{ movie.rating.toFixed(1) }}
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">{{ movie.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="genre in movie.genre" 
                :key="genre" 
                class="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
              >
                {{ genre }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section id="features" class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-neutral-900">Why MovieMind?</h2>
          <p class="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover the features that make our platform the ultimate destination for movie lovers
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center hover:shadow-lg transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Personalized Recommendations</h3>
            <p class="text-neutral-600">
              Our advanced algorithm learns your preferences and suggests movies you'll love.
            </p>
          </div>
          
          <div class="card text-center hover:shadow-lg transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Curated Collections</h3>
            <p class="text-neutral-600">
              Explore expertly curated collections for every mood, genre, and occasion.
            </p>
          </div>
          
          <div class="card text-center hover:shadow-lg transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Social Experience</h3>
            <p class="text-neutral-600">
              Share recommendations, create watchlists, and connect with fellow movie enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-primary-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Ready to Discover Amazing Movies?</h2>
        <p class="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Join our community today and start exploring a world of cinematic gems tailored to your preferences.
        </p>
        <button 
          @click="navigateToMovies" 
          class="btn bg-white text-primary-600 hover:bg-white/90 active:bg-white/80 text-base font-medium"
        >
          Get Started Now
        </button>
      </div>
    </section>
  </div>
</template>