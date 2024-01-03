<template>
  <h4 class="text-white font-semibold">VOTRE SOLDE</h4>
  <h1 class="text-white font-semibold" id="balance">€{{ total }}</h1>
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
