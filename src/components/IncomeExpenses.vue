<template>
  <div class="inc-exp-container dialog ">
    <div class="text-center">
      <h4 class="font-bold text-lg ">REVENUS</h4>
      <p id="money-plus" class="money plus text-2xl font-semibold">+€{{ income }}</p>
    </div>
    <div class="text-center">
      <h4 class="font-bold text-lg ">DÉPENSES</h4>
      <p id="money-minus" class="money minus text-2xl font-semibold">-€{{ expenses }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
});
</script>
