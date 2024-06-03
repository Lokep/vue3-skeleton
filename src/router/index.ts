import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import { sleep } from '@/utils'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        canPullDownRefresh: true,
        canReachBottom: true,
        transitionName: ['fadeIn', 'fadeOut'],
        invokes: [
          async() => {
            console.log('invoke1')
            await sleep(200)
          },

          async() => {
            console.log('invoke2')
            await sleep(200)
          }
        ]
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import("@/views/home/test.vue"),
      meta: {
        transitionName: ['zoomIn', 'zoomOut']
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component:() => import('@/views/home/404.vue')
    }
  ]
})

export default router
