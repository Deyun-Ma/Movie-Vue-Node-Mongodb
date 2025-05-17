<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="text-center px-4">
      <h1 class="text-9xl font-bold text-primary-500">404</h1>
      <h2 class="text-3xl font-bold text-neutral-900 mt-4">Page Not Found</h2>
      <p class="text-xl text-neutral-600 mt-2 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <router-link to="/" class="btn-primary mt-8 inline-block">
        Go back home
      </router-link>
    </div>
  </div>
</template>