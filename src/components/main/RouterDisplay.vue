<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="display">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.display {
  width: 100%;
  height: 100%;
  background: $main-background-color;
}
</style>
