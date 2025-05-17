<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)

const isLoggedIn = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'home' })
  closeMenu()
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      <div class="flex justify-between h-16">
        <!-- Logo and site name -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center" @click="closeMenu">
            <span class="text-xl font-bold text-primary-500">MovieMind</span>
          </router-link>
        </div>
        
        <!-- Desktop menu -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <router-link 
            to="/" 
            class="text-neutral-600 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-primary-500': $route.name === 'home' }"
          >
            Home
          </router-link>
          
          <router-link 
            to="/movies" 
            class="text-neutral-600 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-primary-500': $route.name === 'movies' }"
            v-if="isLoggedIn"
          >
            Movies
          </router-link>
          
          <template v-if="isLoggedIn">
            <div class="relative ml-3">
              <div>
                <button 
                  type="button" 
                  class="flex items-center gap-x-1 text-sm font-medium text-neutral-600 hover:text-primary-500 focus:outline-none"
                  @click="toggleMenu"
                >
                  <span>{{ user?.name }}</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="isMenuOpen"
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    @click="closeMenu"
                  >
                    Your Profile
                  </router-link>
                  <button
                    class="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    @click="handleLogout"
                  >
                    Sign out
                  </button>
                </div>
              </transition>
            </div>
          </template>
          
          <template v-else>
            <router-link 
              to="/login" 
              class="text-neutral-600 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="btn-primary"
            >
              Register
            </router-link>
          </template>
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-500 hover:bg-neutral-100 focus:outline-none"
            @click="toggleMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu, show/hide based on menu state -->
      <div v-if="isMenuOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
            :class="{ 'bg-primary-50 text-primary-500': $route.name === 'home' }"
            @click="closeMenu"
          >
            Home
          </router-link>
          
          <router-link
            v-if="isLoggedIn"
            to="/movies"
            class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
            :class="{ 'bg-primary-50 text-primary-500': $route.name === 'movies' }"
            @click="closeMenu"
          >
            Movies
          </router-link>
        </div>
        
        <div class="pt-4 pb-3 border-t border-neutral-200">
          <template v-if="isLoggedIn">
            <div class="flex items-center px-5">
              <div>
                <div class="text-base font-medium text-neutral-800">{{ user?.name }}</div>
                <div class="text-sm font-medium text-neutral-500">{{ user?.email }}</div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <router-link
                to="/profile"
                class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
                @click="closeMenu"
              >
                Your Profile
              </router-link>
              <button
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
                @click="handleLogout"
              >
                Sign out
              </button>
            </div>
          </template>
          
          <template v-else>
            <div class="space-y-1">
              <router-link
                to="/login"
                class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
                @click="closeMenu"
              >
                Login
              </router-link>
              <router-link
                to="/register"
                class="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-500 hover:bg-neutral-100"
                @click="closeMenu"
              >
                Register
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>