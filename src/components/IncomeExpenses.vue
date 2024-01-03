<template>
  <div class="inc-exp-container dialog">
    <div>
      <h4>REVENUS</h4>
      <p id="money-plus" class="money plus">+€{{ income }}</p>
    </div>
    <div>
      <h4>DÉPENSES</h4>
      <p id="money-minus" class="money minus">-€{{ expenses }}</p>
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
