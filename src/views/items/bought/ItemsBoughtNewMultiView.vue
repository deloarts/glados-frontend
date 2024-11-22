<script setup lang="ts">
import ControlsNewMulti from "@/components/items/bought/ControlsNewMulti.vue";
import CreateItemMultiTable from "@/components/items/bought/createTable/CreateItemTable.vue";
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid">
        <div id="controls" class="controls">
          <ControlsNewMulti />
        </div>
        <div id="data" class="data">
          <CreateItemMultiTable />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

.views-content {
  height: calc(100% - 20px); // This is ugly, should be changed...
  overflow: none;
}

.grid {
  width: 100%;
  height: 100%;

  display: grid;

  grid-gap: 10px;
  grid-template-columns: 100%;
  grid-template-rows: min-content auto;
  grid-template-areas:
    "controls"
    "data";
}

.controls {
  overflow: auto;
}

.data {
  overflow: auto;
  padding-bottom: 2px;
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
