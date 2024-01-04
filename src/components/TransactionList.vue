<template>
  <h3 class="text-white font-semibold">Historique</h3>
  <div class="table-container overflow-x-auto">
    <table class="table">
      <thead  class="bg-gray-700">
        <tr>
          <th>Titre</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Heure</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.text }}</td>
          <td class="capitalize select-none whitespace-nowrap font-medium text-xs px-2">
  <span class="flex items-center justify-center h-full rounded" :class="transaction.amount >= 0 ? 'bg-green-400 text-green-400' : 'bg-red-400 text-red-900'" :style="{ backgroundColor: transaction.amount >= 0 ? 'rgba(0,254,220,.113)' : '' }">
    €{{ transaction.amount }}
  </span>
</td>

          <td>{{ formatDate(transaction.date) }}</td>
          <td>{{ formatTime(transaction.date) }}</td>
          <td>
  <button class="delete-btn" @click="deleteTransaction(transaction.id)">
    <svg class="icon-trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18m-2 0a2 2 0 00-2-2h-8a2 2 0 00-2 2m-2 0v14a2 2 0 002 2h8a2 2 0 002-2V6"/>
    </svg>
  </button>
</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  transactions: Array,
});


// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' };
  return new Date(dateString).toLocaleTimeString('fr-FR', options);
};



const emit = defineEmits(['transactionDeleted']);

const deleteTransaction = (id) => {
  emit('transactionDeleted', id);
};
</script>
