<template>
  <h3 class="text-white font-semibold">Ajouter une nouvelle transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div   class="form-control">
    
      <input class="nb-input default"  type="text" id="text" placeholder="Descriptif..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount"
      class="text-white font-semibold mt-8" >Montant <br />
        <span class="text-gray-400 text-sm">(négatif - dépenses, positif - revenus)</span></label
      >
      <input
        class="nb-input default"
        type="text"
        id="amount"
        placeholder="Entrez le montant..."
        v-model="amount"
      />
    </div>
    <button class="mt-4 nb-button green rounded">+ TRANSACTION</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { supabase } from '../api/supabaseClient';

const text = ref('');
const amount = ref('');

// Get toast interface
const toast = useToast();

const emit = defineEmits(['transactionSubmitted']);

const onSubmit = async () => {
  if (!text.value || !amount.value) {
    // Display a toast error message if either field is empty
    toast.error('Les deux champs doivent être remplis');
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
    date: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('transactions')
    .insert([transactionData]);

  if (error) {
    toast.error('Erreur d’ajout de transaction');
    console.error('Error:', error);
  } else {
    toast.success('Transaction ajoutée.');
    emit('transactionSubmitted', transactionData);
  }

  // Clear form fields
  text.value = '';
  amount.value = '';
};
</script>

