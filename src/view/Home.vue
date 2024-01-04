<template>
  <div id="home">
    <Header />
    <Balance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

  
  
  <script setup>
  import Header from '../components/Header.vue';
  import Balance from '../components/Balance.vue';
  import IncomeExpenses from '../components/IncomeExpenses.vue';
  import TransactionList from '../components/TransactionList.vue';
  import AddTransaction from '../components/AddTransaction.vue';
  import { supabase } from '../api/supabaseClient';
  
  
  import { ref, computed, onMounted } from 'vue';
  
  import { useToast } from 'vue-toastification';
  
  
  const toast = useToast();
  
  const transactions = ref([]);
  
  onMounted(async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*');
  
    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      transactions.value = data;
    }
  });
  
  
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
  
  
  
  // Submit transaction
  const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
      id: generateUniqueId(),
      text: transactionData.text,
      amount: transactionData.amount,
    });
  
    saveTransactionsToLocalStorage();
  
    toast.success('Transaction added.');
  };
  
  
  
  
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
  