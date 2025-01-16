<script setup lang="ts">
import { useRoute } from 'vue-router'

import ButtonServer from '@/components/elements/ButtonServer.vue'
import ButtonFile from '@/components/elements/ButtonFile.vue'
import ButtonUsers from '@/components/elements/ButtonUsers.vue'
import ButtonCloudKey from '@/components/elements/ButtonCloudKey.vue'
import ButtonConfig from '@/components/elements/ButtonConfig.vue'

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
      <router-link :to="'/settings/host'"
        ><ButtonServer
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/settings/host') }"
          :text="languageStore.l.settings.host.selectorButton"
        />
      </router-link>
      <router-link :to="'/settings/config'"
        ><ButtonConfig
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/settings/config') }"
          :text="languageStore.l.settings.config.selectorButton"
      /></router-link>
      <router-link :to="'/settings/logs'"
        ><ButtonFile
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/settings/logs') }"
          :text="languageStore.l.settings.logs.selectorButton"
      /></router-link>
      <router-link :to="'/settings/users'"
        ><ButtonUsers
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/settings/users') }"
          :text="languageStore.l.settings.users.selectorButton"
      /></router-link>
      <router-link :to="'/settings/api-keys'"
        ><ButtonCloudKey
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/settings/api-keys') }"
          :text="languageStore.l.settings.apiKeys.selectorButton"
      /></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
