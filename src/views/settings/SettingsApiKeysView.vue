<script setup lang="ts">
import SettingsControls from '@/components/settings/SettingsControls.vue'
import SettingsApiKeys from '@/components/settings/SettingsApiKeys.vue'
import WarningForForm from '@/components/common/WarningForForm.vue'

import { useLanguageStore } from '@/stores/language'
const languageStore = useLanguageStore()
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <SettingsControls />
        </div>
        <div id="display">
          <SettingsApiKeys />
        </div>
        <div class="grid-area-warning">
          <WarningForForm :text="languageStore.l.settings.apiKeys.warningMsg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    'controls'
    'display';
}

#controls {
  grid-area: controls;
}

#display {
  grid-area: display;
  // overflow-x: hidden;
  // overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
