<script setup>
import { ref } from "vue"
import constants from "@/constants"

const hover = ref(false)
const text = `v${constants.version} (v${constants.serverVersion})`
</script>

<template>
  <div class="footer" @mouseover="hover=true" @mouseleave="hover=false">
    <span v-if="hover">the cake is a lie</span>
    <span v-else>{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
@import '@/scss/variables.scss';

.footer {
  display: table;

  width: 100%;
  height: 100%;

  font-family: $main-font-neutral;
  font-size: 0.75em;
  font-weight: thin;

  color: white;
  background: $main-color;

  cursor: default;
}

.footer span {
  display: table-cell;

  text-align: center;
  vertical-align: middle;
}
</style>
