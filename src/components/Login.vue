<template>
  <div class="dialog">
      <form @submit.prevent="handleLogin">
          <div>
              <label for="email" class="md:text-sm">Email:</label>
              <input class="flex justify-center nb-input default md:text-sm" type="email" id="email" v-model="email" placeholder="Email..." required>
          </div>
          <div>
              <label for="password" class="md:text-sm">MP:</label>
              <input class="flex justify-center nb-input default md:text-sm" type="password" id="password" v-model="password" placeholder="Mot de passe..." required>
          </div>
          <div>
              <button class="mt-4 nb-button green rounded md:text-sm" type="submit">Login</button>
          </div>
          <div class="mt-4 text-center md:text-sm">
              <span class="text-gray-600">Pas de compte ?</span>
              <router-link to="/register" class="text-blue-600 hover:text-blue-800">Inscription</router-link>
          </div>
      </form>
  </div>
<div class="mt-40 flex flex-col justify-center items-center">
<span class="mb-2">Get the App for Windows</span>
<a href="https://github.com/JOBOYA/Tracker/releases/tag/v1" target="_blank">
  <!-- Logo Windows SVG -->
  <svg width="50" height="50" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="m0 4.599l13-1.796v12.599H0zm14.599-2L32 0v15.197H14.599zM0 16.803h13v12.599L0 27.599zm14.599 0H32V32l-17.197-2.401z"/>
  </svg>
</a>
</div>

 
</template>


  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { supabase } from '../api/supabaseClient';
  import { useRouter } from 'vue-router';
 

  const toast = useToast();
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  
  const handleLogin = async () => {
    if (!email.value || !password.value) {
      toast.error('Please enter both email and password');
      return;
    }
  
    try {
      const { error } =  await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
  
      toast.success(`Connecté avec succès`);
      router.push('/home');

     
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    }
  };
  </script>
  