<script setup>
import SettingsControls from "@/components/settings/SettingsControls.vue";
import SettingsHost from "@/components/settings/SettingsHost.vue";
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <SettingsControls></SettingsControls>
        </div>
        <div id="display">
          <SettingsHost></SettingsHost>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
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
  // overflow-x: hidden;
  // overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
