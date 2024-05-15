import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const modules = import.meta.glob('../docs/**/*.md')

console.log(modules)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/home/404.vue')
    }
  ]
})

export default router
