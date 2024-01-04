<template>
    <div class="dialog">
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input  class="flex justify-center nb-input default" type="email" id="email" v-model="email" placeholder="Email..." required>
        </div>
        <div>
          <label for="password">MP:</label>
          <input  class=" flex justify-center nb-input default" type="password" id="password" v-model="password" placeholder="Mot de passe..." required>
        </div>
        <div>
          <button class="mt-4 nb-button green rounded" type="submit">Login</button>
        </div>
      </form>
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
  