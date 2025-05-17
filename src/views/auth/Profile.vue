<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = ref(authStore.user)
const isLoading = ref(false)
const updateSuccess = ref(false)
const errorMessage = ref('')

// Form state
const name = ref(user.value?.name || '')
const email = ref(user.value?.email || '')
const newPassword = ref('')
const confirmPassword = ref('')

const updateProfile = async () => {
  // Here you would implement the actual profile update
  // This is a placeholder for now
  
  if (newPassword.value && newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  isLoading.value = true
  updateSuccess.value = false
  errorMessage.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    updateSuccess.value = true
    
    // Reset password fields
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to update profile'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Update user data when component mounts
  user.value = authStore.user
  name.value = user.value?.name || ''
  email.value = user.value?.email || ''
})
</script>

<template>
  <div class="container-page">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-neutral-900 mb-8">Profile Settings</h1>
      
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-neutral-800 mb-6">Account Information</h2>
        
        <div v-if="updateSuccess" class="mb-6 bg-success-100 text-success-500 p-4 rounded-md">
          Profile updated successfully
        </div>
        
        <div v-if="errorMessage" class="mb-6 bg-error-100 text-error-500 p-4 rounded-md">
          {{ errorMessage }}
        </div>
        
        <div class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              v-model="name"
              class="input w-full"
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
              class="input w-full"
              disabled
            />
            <p class="mt-1 text-sm text-neutral-500">
              Email address cannot be changed
            </p>
          </div>
          
          <div>
            <label for="new-password" class="block text-sm font-medium text-neutral-700 mb-1">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              v-model="newPassword"
              class="input w-full"
              placeholder="Leave blank to keep current password"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-neutral-700 mb-1">
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              v-model="confirmPassword"
              class="input w-full"
              placeholder="Confirm new password"
            />
          </div>
          
          <div>
            <button
              @click="updateProfile"
              class="btn-primary flex items-center"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ isLoading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="card bg-neutral-50 border border-neutral-200">
        <h2 class="text-xl font-semibold text-neutral-800 mb-6">Account Preferences</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              id="email-notifications"
              type="checkbox"
              class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label for="email-notifications" class="ml-3 text-sm text-neutral-700">
              Receive email notifications for new recommendations
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              id="newsletter"
              type="checkbox"
              class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label for="newsletter" class="ml-3 text-sm text-neutral-700">
              Subscribe to monthly newsletter
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>