<script setup lang="ts">
import Intro from './components/Intro.vue'
</script>

<template>
  <main>
    <Intro />
  </main>
</template>
<style scoped>
main{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
}
</style>