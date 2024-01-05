import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import router from './route/index.js'; // Assurez-vous que ce chemin est correct
import App from './App.vue'; // Assurez-vous que ce chemin est correct
import { supabase } from './api/supabaseClient'; // Importez Supabase

const app = createApp(App); // Créez l'application Vue avec App.vue
app.use(Toast);
app.use(router); // Utilisez vue-router

// Ajoutez un guard de route pour vérifier l'authentification avant chaque changement de route
router.beforeEach((to, from, next) => {
    const user = supabase.auth.getUser(); // Obtenez l'utilisateur actuellement authentifié
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Vérifiez si la route nécessite une authentification

  if (requiresAuth && !user) {
    next('/login'); // Redirigez vers le login si l'utilisateur n'est pas authentifié
  } else {
    next(); // Sinon, continuez la navigation normalement
  }
});

app.mount('#app');
