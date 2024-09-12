<script setup lang="ts">
import { ref } from "vue";
import { useBoughtItemsControlsStore } from "@/stores/controls";

import DataTable from "@/components/projects/DataTable.vue";
import Controls from "@/components/projects/Controls.vue";

// Store
const controlsStore = useBoughtItemsControlsStore();

// Items
const selectedProjectId = ref<number>(null);
const triggerGetNewData = ref<boolean>(false);
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div
        class="grid"
        v-bind:class="{ 'show-changelog': controlsStore.state.changelog }"
      >
        <div id="controls" class="controls">
          <Controls
            v-model:selected-project-id="selectedProjectId"
            v-model:trigger-get-new-data="triggerGetNewData"
          />
        </div>
        <div id="data" class="data">
          <DataTable
            v-model:selected-project-id="selectedProjectId"
            v-model:trigger-get-new-data="triggerGetNewData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped lang="scss">
@import "@/scss/variables.scss";
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

// grid
#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
