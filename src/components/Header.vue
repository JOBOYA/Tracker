<template>
  <div class="flex justify-between items-center">
    <h2 class="text-white font-semibold">Suivi des dépenses</h2>
    <div class="flex items-center">
      <img
        class="w-16 h-16 rounded-full mr-4" 
        src="https://api.dicebear.com/7.x/notionists/svg"
        alt="avatar"
      />
      <Logout />
    </div>
  </div>
</template>

<script>
import Logout from './Logout.vue';

export default {
  components: {
    Logout
  },
};
</script>
