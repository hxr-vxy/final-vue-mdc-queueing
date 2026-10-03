import { createRouter, createWebHashHistory } from 'vue-router'
import ClientQueue from '../views/ClientQueue.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import { isAuthenticated } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'client', component: ClientQueue },
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  { path: '/admin', name: 'admin', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

// Navigation guard: protect /admin, and skip the login page if already logged in.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) return { name: 'admin-login' }
  if (to.name === 'admin-login' && isAuthenticated()) return { name: 'admin' }
})

export default router
