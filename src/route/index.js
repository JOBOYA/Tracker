// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../api/supabaseClient';
import Login from '../components/Login.vue';
import Home from '../view/Home.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Ajoutez une redirection par défaut
  { path: '/login', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  // ... other routes ...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

supabase.auth.onAuthStateChange((_event, session) => {
  router.beforeEach((to, from, next) => {
    const user = session?.user;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !user) {
      next('/login');
    } else {
      next();
    }
  });
});

export default router;
