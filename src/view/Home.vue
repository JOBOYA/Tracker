<template>
  <div class="p-4 sm:p-6 md:p-8 lg:p-10" id="home">
    <Header />
    <Balance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    <LineChart :transactionsData="transactions" />
        <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

  
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { supabase } from '../api/supabaseClient';

import Header from '../components/Header.vue';
import Balance from '../components/Balance.vue';
import IncomeExpenses from '../components/IncomeExpenses.vue';
import TransactionList from '../components/TransactionList.vue';
import AddTransaction from '../components/AddTransaction.vue';
import LineChart from '../components/LineChart.vue';


const toast = useToast();
const transactions = ref([]);

// Cette fonction récupère les transactions de l'utilisateur connecté
const fetchTransactions = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.auth.refreshSession();

  if (user) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id);
     

    if (error) {
      toast.error('Erreur lors de la récupération des transactions');
      console.error('Error fetching transactions:', error);
    } else {
      
      transactions.value = data
      

    }
  } else {
    toast.error("Utilisateur non connecté");
  }
};

// Appel de fetchTransactions au montage du composant
onMounted(fetchTransactions);

// fonction lorsqu'une nouvelle transaction est soumise
const handleTransactionSubmitted = async () => {
  await fetchTransactions();
};


  // Get total
  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  });
  
  // Get income
  const income = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  });
  
  // Get expenses
  const expenses = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
      .toFixed(2);
  });
  


  function generateUniqueId() {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
}



  
  const handleTransactionDeleted = async (id) => {
    console.log('Deleting transaction with ID:', id);
  
    const { error } = await supabase
      .from('transactions')
      .delete()
      .match({ id });
  
    if (error) {
      console.error('Error:', error);
      toast.error('Error deleting transaction');
    } else {
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id
      );
      toast.success('Transaction deleted.');
    }
  };
  
  
  </script>
  