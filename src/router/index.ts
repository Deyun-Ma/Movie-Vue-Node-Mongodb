import Home from '../views/Home.vue'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta: { title: 'Register' }
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/movies/MovieList.vue'),
    meta: { title: 'Movies', requiresAuth: true }
  },
  {
    path: '/movies/:id',
    name: 'movie-detail',
    component: () => import('../views/movies/MovieDetail.vue'),
    meta: { title: 'Movie Detail', requiresAuth: true }
  },
  {
    path: '/movies/create',
    name: 'movie-create',
    component: () => import('../views/movies/MovieForm.vue'),
    meta: { title: 'Add Movie', requiresAuth: true }
  },
  {
    path: '/movies/:id/edit',
    name: 'movie-edit',
    component: () => import('../views/movies/MovieForm.vue'),
    meta: { title: 'Edit Movie', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/auth/Profile.vue'),
    meta: { title: 'Profile', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found' }
  }
]

export default routes