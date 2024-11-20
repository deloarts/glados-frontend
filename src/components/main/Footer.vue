<script setup lang="ts">
import { ref } from "vue";
import constants from "@/constants";

const hover = ref<boolean>(false);
const text = `v${constants.version}`;
</script>

<template>
  <div class="footer" @mouseover="hover = true" @mouseleave="hover = false">
    <span v-if="hover">the cake is a lie</span>
    <span v-else>{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: table;

  width: 100%;
  height: 100%;

  font-family: var(--main-font-text);
  font-size: 0.75em;
  font-weight: thin;

  color: white;
  background: var(--main-color);

  cursor: default;
}

.footer span {
  display: table-cell;

  text-align: center;
  vertical-align: middle;
}
</style>
