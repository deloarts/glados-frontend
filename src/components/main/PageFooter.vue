<script setup lang="ts">
import { ref } from 'vue'
import constants from '@/constants'
import config from '@/config'

const text = ref<string>(config.company)
</script>

<template>
  <div class="footer" 
    @mouseover="text = `v${constants.version}`"
    @mouseleave="text = config.company"
    @click="text = 'The cake is a lie!'">
    <span>{{ text }}</span>
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
