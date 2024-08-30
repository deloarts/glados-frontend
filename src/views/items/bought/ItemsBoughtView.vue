<script setup lang="ts">
import { ref } from "vue";
import { useBoughtItemsControlsStore } from "@/stores/controls";

import Changelog from "@/components/items/bought/Changelog.vue";
import DataTable from "@/components/items/bought/DataTable.vue";
import Controls from "@/components/items/bought/Controls.vue";

// Store
const controlsStore = useBoughtItemsControlsStore();

// Items
const selectedItemIds = ref<Array<number>>([]);
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
            v-model:selected-item-ids="selectedItemIds"
            v-model:trigger-get-new-data="triggerGetNewData"
          />
        </div>
        <div id="data" class="data">
          <DataTable
            v-model:selected-item-ids="selectedItemIds"
            v-model:trigger-get-new-data="triggerGetNewData"
          />
        </div>
        <div
          id="changelog"
          class="changelog"
          v-if="controlsStore.state.changelog"
        >
          <Changelog v-model:selected-item-ids="selectedItemIds" />
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

.show-changelog {
  grid-template-rows: min-content auto 200px;
  grid-template-areas:
    "controls"
    "data"
    "changelog";
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

#changelog {
  grid-area: changelog;
}
</style>
