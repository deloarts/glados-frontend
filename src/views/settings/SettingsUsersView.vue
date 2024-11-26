<script setup lang="ts">
import SettingsControls from '@/components/settings/SettingsControls.vue'
import SettingsUsers from '@/components/settings/SettingsUsers.vue'
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <SettingsControls />
        </div>
        <div id="display">
          <SettingsUsers />
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
  // overflow: auto;
  // overflow-x: hidden;
  // overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
