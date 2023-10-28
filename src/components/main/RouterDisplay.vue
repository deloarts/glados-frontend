<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="display">
    <RouterView />
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.display {
  background: $main-background-color;
}
</style>
