<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h2 class="has-text-grey-lighter">Oi</h2>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>
  
<style scoped>
  h2{ color:black;}
</style>
