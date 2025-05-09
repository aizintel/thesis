import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('@/views/Sign-up.vue'),
    },
  ],
})

import { useAuthStore } from '@/stores'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
 
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
