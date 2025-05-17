<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '../../stores/movies'
import { GENRES } from '../../config'

const route = useRoute()
const router = useRouter()
const moviesStore = useMoviesStore()

const isEditMode = computed(() => route.name === 'movie-edit')
const movieId = computed(() => route.params.id as string)

const title = ref('')
const overview = ref('')
const poster = ref('')
const releaseDate = ref('')
const rating = ref(0)
const selectedGenres = ref<string[]>([])

const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')

// Load movie data in edit mode
const loadMovie = async () => {
  if (!isEditMode.value) return
  
  isLoading.value = true
  try {
    await moviesStore.fetchMovie(movieId.value)
    const movie = moviesStore.movie
    
    if (movie) {
      title.value = movie.title
      overview.value = movie.overview
      poster.value = movie.poster
      releaseDate.value = movie.releaseDate.split('T')[0] // Format date for input
      rating.value = movie.rating
      selectedGenres.value = movie.genre
    }
  } catch (error) {
    console.error('Failed to fetch movie:', error)
    errorMessage.value = 'Failed to load movie data'
  } finally {
    isLoading.value = false
  }
}

const toggleGenre = (genre: string) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter(g => g !== genre)
  } else {
    selectedGenres.value.push(genre)
  }
}

const saveMovie = async () => {
  // Validation
  if (!title.value || !overview.value || !releaseDate.value || selectedGenres.value.length === 0) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }
  
  const movieData = {
    title: title.value,
    overview: overview.value,
    poster: poster.value,
    releaseDate: releaseDate.value,
    rating: rating.value,
    genre: selectedGenres.value
  }
  
  isSaving.value = true
  errorMessage.value = ''
  
  try {
    if (isEditMode.value) {
      await moviesStore.updateMovie(movieId.value, movieData)
    } else {
      await moviesStore.createMovie(movieData)
    }
    
    router.push({ name: 'movies' })
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to save movie'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  loadMovie()
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
    
    <div v-else class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <router-link to="/movies" class="flex items-center text-primary-500 hover:text-primary-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Movies
        </router-link>
      </div>
      
      <div class="card-glass">
        <h1 class="text-3xl font-bold text-neutral-900 mb-8">
          {{ isEditMode ? 'Edit Movie' : 'Add New Movie' }}
        </h1>
        
        <div v-if="errorMessage" class="mb-6 bg-error-100 text-error-500 p-4 rounded-md">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="saveMovie" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-neutral-700 mb-1">
              Title <span class="text-error-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              v-model="title"
              required
              class="input w-full"
              placeholder="Enter movie title"
            />
          </div>
          
          <div>
            <label for="overview" class="block text-sm font-medium text-neutral-700 mb-1">
              Overview <span class="text-error-500">*</span>
            </label>
            <textarea
              id="overview"
              v-model="overview"
              rows="4"
              required
              class="input w-full resize-none"
              placeholder="Enter movie description"
            ></textarea>
          </div>
          
          <div>
            <label for="poster" class="block text-sm font-medium text-neutral-700 mb-1">
              Poster URL
            </label>
            <input
              id="poster"
              type="url"
              v-model="poster"
              class="input w-full"
              placeholder="Enter poster image URL"
            />
            <p class="mt-1 text-sm text-neutral-500">
              Add a URL to an image that represents this movie
            </p>
          </div>
          
          <div>
            <label for="release-date" class="block text-sm font-medium text-neutral-700 mb-1">
              Release Date <span class="text-error-500">*</span>
            </label>
            <input
              id="release-date"
              type="date"
              v-model="releaseDate"
              required
              class="input w-full"
            />
          </div>
          
          <div>
            <label for="rating" class="block text-sm font-medium text-neutral-700 mb-1">
              Rating (1-5)
            </label>
            <div class="flex items-center space-x-1">
              <template v-for="star in 5" :key="star">
                <button
                  type="button"
                  @click="rating = star"
                  class="focus:outline-none"
                >
                  <svg
                    class="w-8 h-8"
                    :class="star <= rating ? 'text-primary-500' : 'text-neutral-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </template>
              <span class="ml-2 text-neutral-700 font-medium">{{ rating }} / 5</span>
            </div>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-neutral-700 mb-2">
              Genres <span class="text-error-500">*</span>
            </span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="genre in GENRES"
                :key="genre"
                type="button"
                @click="toggleGenre(genre)"
                class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                :class="selectedGenres.includes(genre) 
                  ? 'bg-primary-500 text-white hover:bg-primary-600' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'"
              >
                {{ genre }}
              </button>
            </div>
            <p v-if="selectedGenres.length === 0" class="mt-1 text-sm text-error-500">
              Please select at least one genre
            </p>
          </div>
          
          <div class="pt-4 flex justify-end space-x-3">
            <router-link to="/movies" class="btn-outline">
              Cancel
            </router-link>
            
            <button
              type="submit"
              class="btn-primary flex items-center"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isSaving ? 'Saving...' : (isEditMode ? 'Update Movie' : 'Create Movie') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>