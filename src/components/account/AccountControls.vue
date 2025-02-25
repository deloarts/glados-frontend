<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ButtonUserEdit from '@/components/elements/ButtonUserEdit.vue'
import ButtonCloudKey from '@/components/elements/ButtonCloudKey.vue'
import ButtonLock from '@/components/elements/ButtonLock.vue'

import { useLanguageStore } from '@/stores/language'
import { useResolutionStore } from '@/stores/resolution'

const route = useRoute()

const languageStore = useLanguageStore()
const resolutionStore = useResolutionStore()

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

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
      <router-link :to="'/account/security'"
        ><ButtonLock
          class="controls-base-element"
          :class="{ active: routeIsActive('/account/security') }"
          :text="languageStore.l.account.button.security"
      /></router-link>
      <router-link :to="'/account/pat'" v-if="gtMinWidthTablet"
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
