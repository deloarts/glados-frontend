<script setup lang="ts">
import { ref } from 'vue'
import constants from '@/constants'
import config from '@/config'

const hover = ref<boolean>(false)
</script>

<template>
  <div class="footer" @mouseover="hover = true" @mouseleave="hover = false">
    <span v-if="hover">{{ `v${constants.version}` }}</span>
    <span v-else>{{ config.company }}</span>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: table;

  width: 100%;
  height: 100%;

  font-family: var(--main-font-text);
  font-size: 0.9em;
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
