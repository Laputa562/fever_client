import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
})

async function isLoggedIn() {
  try {
    const apiKey = localStorage.getItem('fever_api_key')
    if (!apiKey) return false
    const body = new URLSearchParams({
      api_key: apiKey,
    })
    const res = await fetch('/fever?api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = await res.json()
    if (data.auth == 1) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

router.beforeEach(async (to) => {
  const loggedIn = await isLoggedIn()

  if (to.meta.requiresAuth && !loggedIn) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  } else if (to.name == 'login' && loggedIn) {
    return {
      name: 'home',
      query: { redirect: to.fullPath },
    }
  }
  return true
})

export default router
