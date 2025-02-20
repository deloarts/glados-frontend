<script setup lang="ts">
import { useRoute } from 'vue-router'

import ButtonBlade from '@/components/elements/ButtonBlade.vue'

import { useLanguageStore } from '@/stores/language'

// Router
const route = useRoute()

const languageStore = useLanguageStore()

function routeIsActive(currentLink: string) {
  const activeRoute = route.path
  if (activeRoute != '/login') {
    localStorage.setItem('gladosActiveRoute', activeRoute)
  }
  if (activeRoute.includes(currentLink)) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="settings-controls" class="controls-base-container">
      <router-link :to="'/tools/stock-cut-1d'"
        ><ButtonBlade
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/tools/stock-cut-1d') }"
          :text="languageStore.l.tools.buttons.stockCut1D"
      /></router-link>

      <router-link :to="'/tools/stock-cut-2d'"
        ><ButtonBlade
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/tools/stock-cut-2d') }"
          :text="languageStore.l.tools.buttons.stockCut2D"
      /></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
