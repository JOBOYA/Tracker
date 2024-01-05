<template>
    <div class="dialog">
      <form @submit.prevent="handleRegister">
        <div>
          <label for="email">Email:</label>
          <input class="flex justify-center nb-input default" type="email" id="email" v-model="email" placeholder="Email..." required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input class="flex justify-center nb-input default" type="password" id="password" v-model="password" placeholder="Mot de passe..." required>
        </div>
        <div>
          <button class="mt-4 nb-button green rounded" type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
    <ConfirmationModal :showModal="showConfirmationModal" @update:showModal="showConfirmationModal = $event" @onOk="handleOk"/>     
  </template>
  

  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { supabase } from '../api/supabaseClient';
  import { useRouter } from 'vue-router';
  import ConfirmationModal from './ConfirmationModal.vue'; // Assurez-vous d'importer le composant modal
  
  const toast = useToast();
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const showConfirmationModal = ref(false); // Ajout d'une référence pour contrôler l'affichage de la modal
  
  const handleRegister = async () => {
  if (!email.value || !password.value) {
    toast.error('Veuillez entrer un email et un mot de passe');
    return;
  }

  // Afficher la modal juste avant de commencer l'inscription
  showConfirmationModal.value = true;
  
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    // Masquer la modal immédiatement après la réponse de Supabase
    showConfirmationModal.value = false;

    if (error) throw error;
    if (user) {
      toast.success(`Inscription réussie. Veuillez vérifier votre email pour la confirmation.`);
      // Rediriger vers la page de connexion
      
    }
  } catch (error) {
    toast.error('Échec de l\'inscription : ' + error.message);
  }
};

const handleOk = () => {
  router.push('/login'); // Redirection quand OK est cliqué
};
  
  </script>