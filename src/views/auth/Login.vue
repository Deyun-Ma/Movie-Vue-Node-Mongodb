<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// Get the redirect path if available
const redirectPath = computed(() => route.query.redirect as string || '/movies')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password'
    return
  }
  
  try {
    isLoading.value = true
    await authStore.login(email.value, password.value)
    router.push(redirectPath.value)
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="card-glass max-w-md w-full">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-neutral-900">Log in to MovieMind</h2>
        <p class="mt-2 text-neutral-600">
          Welcome back! Please enter your details.
        </p>
      </div>
      
      <div class="mt-8">
        <div class="space-y-6">
          <div class="alert bg-error-100 text-error-500 p-4 rounded-md" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="input w-full"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <a href="#" class="text-sm text-primary-500 hover:text-primary-600">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="input w-full"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              @click="handleLogin"
              class="btn-primary w-full flex justify-center items-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? 'Logging in...' : 'Log in' }}
            </button>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-600">
            Don't have an account?
            <router-link to="/register" class="text-primary-500 hover:text-primary-600 font-medium">
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>