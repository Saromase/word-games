import Home from '@/components/Home/Home.vue'
import Motus from '@/components/Motus/Motus.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home},
    { path: '/motus', component: Motus},
  ],
})

export default router
