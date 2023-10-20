<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="display">
    <RouterView />
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';

.display {
  background: $main-background-color;
}
</style>
