<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  // Validation
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill out all fields'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    return
  }
  
  try {
    isLoading.value = true
    await authStore.register(name.value, email.value, password.value)
    router.push('/movies')
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Registration failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="card-glass max-w-md w-full">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-neutral-900">Create your account</h2>
        <p class="mt-2 text-neutral-600">
          Join MovieMind to discover and share amazing films.
        </p>
      </div>
      
      <div class="mt-8">
        <div class="space-y-6">
          <div class="alert bg-error-100 text-error-500 p-4 rounded-md" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          
          <div>
            <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              v-model="name"
              required
              class="input w-full"
              placeholder="Enter your name"
            />
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
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="input w-full"
              placeholder="Create a password"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-neutral-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              v-model="confirmPassword"
              required
              class="input w-full"
              placeholder="Confirm your password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              @click="handleRegister"
              class="btn-primary w-full flex justify-center items-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-neutral-600">
            Already have an account?
            <router-link to="/login" class="text-primary-500 hover:text-primary-600 font-medium">
              Log in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>