import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '../config'
import { useAuthStore } from './auth'

export interface Movie {
  _id: string
  title: string
  overview: string
  poster: string
  releaseDate: string
  genre: string[]
  rating: number
  createdBy: string
}

interface MoviesState {
  movies: Movie[]
  movie: Movie | null
  loading: boolean
  error: string | null
}

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    movies: [],
    movie: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchMovies(query = '', genre = '') {
      this.loading = true
      this.error = null
      
      const authStore = useAuthStore()
      
      try {
        let url = `${API_URL}/movies`
        const params: Record<string, string> = {}
        
        if (query) params.search = query
        if (genre) params.genre = genre
        
        const response = await axios.get(url, {
          params,
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        this.movies = response.data
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch movies'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchMovie(id: string) {
      this.loading = true
      this.error = null
      
      const authStore = useAuthStore()
      
      try {
        const response = await axios.get(`${API_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        this.movie = response.data
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch movie'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async createMovie(movieData: Omit<Movie, '_id' | 'createdBy'>) {
      this.loading = true
      this.error = null
      
      const authStore = useAuthStore()
      
      try {
        const response = await axios.post(`${API_URL}/movies`, movieData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create movie'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateMovie(id: string, movieData: Partial<Movie>) {
      this.loading = true
      this.error = null
      
      const authStore = useAuthStore()
      
      try {
        const response = await axios.put(`${API_URL}/movies/${id}`, movieData, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update movie'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteMovie(id: string) {
      this.loading = true
      this.error = null
      
      const authStore = useAuthStore()
      
      try {
        await axios.delete(`${API_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        // Remove from local state
        this.movies = this.movies.filter(movie => movie._id !== id)
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete movie'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})