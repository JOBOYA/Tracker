<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" v-if="showModal">
    <div class="bg-white p-6 rounded-lg shadow-xl">
      <p class="text-center mb-4">Un mail de confirmation vous a été envoyé.</p>
      <div class="flex justify-center">
        <button class="nb-input green w-1/4"  @click="handleOkClick">OK</button>
</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showModal'],
  methods: {
    closeModal() {
      this.$emit('update:showModal', false);
    },
    handleOkClick() {
      this.closeModal();
      this.$emit('onOk'); 
    }
  }
}
</script>