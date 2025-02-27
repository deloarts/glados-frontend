<script setup lang="ts">
import { computed } from 'vue'

import QuickTheme from '@/components/common/QuickTheme.vue'
import QuickLanguage from '@/components/common/QuickLanguage.vue'

import { useResolutionStore } from '@/stores/resolution'

const resolutionStore = useResolutionStore()

interface Props {
  showQuickMenu?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showQuickMenu: true,
})

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="cell">{{ gtMinWidthTablet ? 'Glados' : '' }}</div>
      <div class="cell">{{ gtMinWidthTablet ? '' : 'Glados' }}</div>
      <div class="cell">
        <QuickLanguage v-if="props.showQuickMenu && gtMinWidthTablet" />
        <QuickTheme v-if="props.showQuickMenu" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/variables.scss' as *;

.header {
  display: table;
  table-layout: fixed;

  width: 100%;
  height: var(--header-height);

  font-family: var(--main-font-text);
  font-size: 1em;
  font-weight: thin;

  color: white;
  background: var(--main-color);

  cursor: default;
}

.row {
  display: table-row;
  height: 100%;
  width: 100%;
}

.cell {
  display: table-cell;
  vertical-align: middle;

  padding-left: 15px;
  padding-right: 5px;
}

.cell:nth-child(1), .cell:nth-child(2) {
  text-align: left;

  font-family: var(--main-font-glados);
  font-size: var(--main-font-glados-size);
  font-weight: thin;
}

.cell:nth-child(3) {
  text-align: right;
}

.icon {
  color: white;
  height: 25px;
  width: 25px;

  border-radius: 1px;
  border-color: white;
}

.dev {
  padding: 10px;
  background-color: red;
  border-radius: var(--main-border-radius);
  border-color: darkred;
}

@media screen and (max-width: $max-width-tablet) {
  .dev {
    font-size: 0.7em;
  }
}
</style>
