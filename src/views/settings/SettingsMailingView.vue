<script setup lang="ts">
import SettingsControls from '@/components/settings/SettingsControls.vue'
import SettingsMailing from '@/components/settings/SettingsMailing.vue'
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <SettingsControls />
        </div>
        <div id="display">
          <SettingsMailing />
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
  grid-template-rows: auto min-content;
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
