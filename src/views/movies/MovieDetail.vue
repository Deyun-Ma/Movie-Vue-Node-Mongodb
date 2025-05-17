<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '../../stores/movies'

const route = useRoute()
const router = useRouter()
const moviesStore = useMoviesStore()

const movie = ref(moviesStore.movie)
const isLoading = ref(true)
const showDeleteModal = ref(false)
const isDeleting = ref(false)
const errorMessage = ref('')

const movieId = computed(() => route.params.id as string)

const fetchMovieDetails = async () => {
  isLoading.value = true
  try {
    await moviesStore.fetchMovie(movieId.value)
    movie.value = moviesStore.movie
  } catch (error) {
    console.error('Failed to fetch movie details:', error)
    errorMessage.value = 'Failed to load movie details'
  } finally {
    isLoading.value = false
  }
}

const editMovie = () => {
  router.push({ name: 'movie-edit', params: { id: movieId.value } })
}

const openDeleteModal = () => {
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  isDeleting.value = true
  try {
    await moviesStore.deleteMovie(movieId.value)
    closeDeleteModal()
    router.push({ name: 'movies' })
  } catch (error) {
    console.error('Failed to delete movie:', error)
    errorMessage.value = 'Failed to delete movie'
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchMovieDetails()
})
</script>

<template>
  <div class="container-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    
    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 class="mt-4 text-xl font-medium text-neutral-900">{{ errorMessage }}</h3>
      <button
        @click="router.push({ name: 'movies' })"
        class="mt-4 btn-primary"
      >
        Back to Movies
      </button>
    </div>
    
    <!-- Movie Details -->
    <div v-else-if="movie" class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <router-link to="/movies" class="flex items-center text-primary-500 hover:text-primary-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Movies
        </router-link>
        
        <div class="flex items-center space-x-3">
          <button
            @click="editMovie"
            class="btn-outline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
          
          <button
            @click="openDeleteModal"
            class="btn-danger flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Delete
          </button>
        </div>
      </div>
      
      <div class="card-glass">
        <!-- Movie Header -->
        <div class="flex flex-col md:flex-row gap-8">
          <div class="w-full md:w-1/3">
            <div class="rounded-lg overflow-hidden shadow-lg">
              <img
                :src="movie.poster || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1280'"
                :alt="movie.title"
                class="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-neutral-900 mb-2">{{ movie.title }}</h1>
            
            <div class="flex items-center mb-4">
              <div class="flex items-center bg-primary-100 text-primary-700 rounded-full px-3 py-1 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ movie.rating.toFixed(1) }} / 5
              </div>
              
              <span class="mx-3 text-neutral-300">|</span>
              
              <span class="text-neutral-600">
                {{ new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
            </div>
            
            <div class="mb-4 flex flex-wrap gap-2">
              <span
                v-for="genre in movie.genre"
                :key="genre"
                class="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
              >
                {{ genre }}
              </span>
            </div>
            
            <h2 class="text-xl font-bold text-neutral-900 mt-6 mb-2">Overview</h2>
            <p class="text-neutral-700 whitespace-pre-line">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-neutral-900 mb-4">Delete Movie</h2>
        <p class="text-neutral-600 mb-6">
          Are you sure you want to delete "{{ movie?.title }}"? This action cannot be undone.
        </p>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="btn-outline"
            :disabled="isDeleting"
          >
            Cancel
          </button>
          
          <button
            @click="confirmDelete"
            class="btn-danger flex items-center"
            :disabled="isDeleting"
          >
            <span v-if="isDeleting" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>