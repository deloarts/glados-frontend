<script setup lang="ts">
import { useRoute } from 'vue-router'

import ButtonUserEdit from '@/components/elements/ButtonUserEdit.vue'
import ButtonCloudKey from '@/components/elements/ButtonCloudKey.vue'

import { useLanguageStore } from '@/stores/language'

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
    <div id="account-controls" class="controls-base-container">
      <router-link :to="'/account/me'"
        ><ButtonUserEdit
          class="controls-base-element"
          :class="{ active: routeIsActive('/account/me') }"
          :text="languageStore.l.account.button.myAccount"
      /></router-link>
      <router-link :to="'/account/pat'"
        ><ButtonCloudKey
          class="controls-base-element"
          :class="{ active: routeIsActive('/account/pat') }"
          :text="languageStore.l.account.button.pat"
      /></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
