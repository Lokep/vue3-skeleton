import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/letter/:id',
      name: 'letter',
      component: () => import('@/views/letters/index.vue')
    },
    {
      path: '/dream/:id',
      name: 'dream',
      component: () => import('@/views/dreams/index.vue')
    },
  ]
})

export default router
