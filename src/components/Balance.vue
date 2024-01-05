<template>
  <div class="mt-6">
  <h4 class="text-white font-semibold md:text-lg">VOTRE SOLDE</h4>
  <h1 class="text-gray-500 font-semibold" id="balance">€{{ total }}</h1>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});
// Pass down the total to the child component
</script>
