import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '../config'

export interface User {
  _id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user
  },
  
  actions: {
    async register(name: string, email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password
        })
        
        this.token = response.data.token
        this.user = response.data.user
        
        // Store token in localStorage
        localStorage.setItem('token', this.token)
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password
        })
        
        this.token = response.data.token
        this.user = response.data.user
        
        // Store token in localStorage
        localStorage.setItem('token', this.token)
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    
    async checkAuth() {
      const token = localStorage.getItem('token')
      
      if (!token) return
      
      this.token = token
      
      try {
        // Validate token and get user info
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        this.user = response.data
      } catch (error) {
        this.token = null
        localStorage.removeItem('token')
      }
    }
  }
})