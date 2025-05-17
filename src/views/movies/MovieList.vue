<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '../../stores/movies'
import { GENRES } from '../../config'

const router = useRouter()
const moviesStore = useMoviesStore()

const isLoading = ref(false)
const searchQuery = ref('')
const selectedGenre = ref('')
const isSearchExpanded = ref(false)

// Pagination
const currentPage = ref(1)
const itemsPerPage = 9
const totalItems = computed(() => moviesStore.movies.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return moviesStore.movies.slice(start, end)
})

const fetchMovies = async () => {
  isLoading.value = true
  try {
    await moviesStore.fetchMovies(searchQuery.value, selectedGenre.value)
    // Reset to first page after filtering
    currentPage.value = 1
  } catch (error) {
    console.error('Failed to fetch movies:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  fetchMovies()
}

const handleGenreChange = (event: Event) => {
  selectedGenre.value = (event.target as HTMLSelectElement).value
  fetchMovies()
}

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewMovieDetails = (id: string) => {
  router.push({ name: 'movie-detail', params: { id } })
}

const createMovie = () => {
  router.push({ name: 'movie-create' })
}

const toggleSearch = () => {
  isSearchExpanded.value = !isSearchExpanded.value
}

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div class="container-page">
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-bold text-neutral-900">Movies</h1>
      
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative md:hidden">
          <button
            @click="toggleSearch"
            class="btn-outline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            Search
          </button>
        </div>
        
        <div class="hidden md:block relative">
          <input
            type="text"
            placeholder="Search movies..."
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            class="input w-64 pr-10"
          />
          <button
            @click="handleSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-primary-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <select
          v-model="selectedGenre"
          @change="handleGenreChange"
          class="input pr-10"
        >
          <option value="">All Genres</option>
          <option v-for="genre in GENRES" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
        
        <button
          @click="createMovie"
          class="btn-primary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Movie
        </button>
      </div>
    </div>
    
    <!-- Mobile Search (visible when expanded) -->
    <div v-if="isSearchExpanded" class="md:hidden mb-6 transition-all duration-300">
      <div class="relative">
        <input
          type="text"
          placeholder="Search movies..."
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          class="input w-full pr-10"
        />
        <button
          @click="handleSearch"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-primary-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    
    <!-- No Results -->
    <div v-else-if="paginatedMovies.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      <h3 class="mt-4 text-xl font-medium text-neutral-900">No movies found</h3>
      <p class="mt-1 text-neutral-600">Try adjusting your search or filter to find what you're looking for.</p>
      <button
        @click="createMovie"
        class="mt-4 btn-primary"
      >
        Add Your First Movie
      </button>
    </div>
    
    <!-- Movie Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="movie in paginatedMovies"
        :key="movie._id"
        class="card cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        @click="viewMovieDetails(movie._id)"
      >
        <div class="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
          <img
            :src="movie.poster || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=640'"
            :alt="movie.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 right-3 bg-primary-500 text-white rounded-full px-2 py-1 text-sm font-medium">
            {{ movie.rating.toFixed(1) }}
          </div>
        </div>
        
        <h3 class="text-xl font-bold text-neutral-900 mb-2 line-clamp-1">{{ movie.title }}</h3>
        
        <p class="text-neutral-600 mb-3 line-clamp-2">{{ movie.overview }}</p>
        
        <div class="flex flex-wrap gap-2">
          <span
            v-for="genre in movie.genre.slice(0, 3)"
            :key="genre"
            class="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
          >
            {{ genre }}
          </span>
          <span
            v-if="movie.genre.length > 3"
            class="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full"
          >
            +{{ movie.genre.length - 3 }} more
          </span>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="mt-8 flex items-center justify-center" v-if="totalPages > 1">
      <nav class="flex items-center space-x-2" aria-label="Pagination">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-outline px-3 py-2 disabled:opacity-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <template v-for="page in totalPages" :key="page">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            @click="goToPage(page)"
            :class="[
              page === currentPage
                ? 'bg-primary-50 text-primary-600 border-primary-500'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100',
              'btn-outline px-4 py-2'
            ]"
          >
            {{ page }}
          </button>
          
          <span
            v-else-if="page === 2 || page === totalPages - 1"
            class="btn-outline px-4 py-2 border-none"
          >
            ...
          </span>
        </template>
        
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-outline px-3 py-2 disabled:opacity-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>