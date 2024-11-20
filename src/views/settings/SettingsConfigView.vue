<script setup lang="ts">
import SettingsControls from "@/components/settings/SettingsControls.vue";
import SettingsConfig from "@/components/settings/SettingsConfig.vue";
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <SettingsControls />
        </div>
        <div id="display">
          <SettingsConfig />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "controls"
    "display";
}

#controls {
  grid-area: controls;
}

#display {
  grid-area: display;
}

::-webkit-scrollbar {
  display: none;
}
</style>
