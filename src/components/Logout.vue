<template>
    <button @click="handleLogout" class="focus:outline-none">
      <!-- Icône de déconnexion (SVG ou image) -->
      <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2"/>
    <path fill="currentColor" d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6z"/>
</svg>
<span class="text-sm">Logout</span>
    </button>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  import { supabase } from '../api/supabaseClient';
  
  export default {
    setup() {
      const router = useRouter();
      const toast = useToast();
  
      const handleLogout = async () => {
        try {
          await supabase.auth.signOut();
          router.push('/login');
          toast.success('Déconnexion réussie');
        } catch (error) {
          toast.error('Erreur lors de la déconnexion');
        }
      };
  
      return { handleLogout };
    },
  };
  </script>
  
  <style>
  /* Ajouter des styles si nécessaire */
  </style>
  