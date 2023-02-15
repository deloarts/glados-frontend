<script lang="ts">
import Changelog from "../../../components/items/bought/Changelog.vue";
import DataTable from "../../../components/items/bought/DataTable.vue";
import Controls from "../../../components/items/bought/Controls.vue";

import { boughtItemsFilter } from "@/presets/boughtItemsFilter";

export default {
  name: 'Bought Items',
  components: {
    Changelog,
    DataTable,
    Controls,
  },
  data() {
    return {
      // Trigger
      triggerGetNewData: false,

      // Controls options
      controlsShowChangelog: localStorage.getItem("gladosBoughtItemControlsShowChangelog") === "true",
      controlsShowRainbow: localStorage.getItem("gladosBoughtItemControlsShowRainbow") === "true",
      controlsShowTextOnly: localStorage.getItem("gladosBoughtItemControlsShowTextOnly") === "true",
      controlsShowFixHeight: localStorage.getItem("gladosBoughtItemControlsShowFixHeight") === "true",
      controlsShowUnclutter: localStorage.getItem("gladosBoughtItemControlsShowUnclutter") === "true",
      controlsShowRequestView: localStorage.getItem("gladosBoughtItemControlsShowRequestView") === "true",

      // Items
      selectedItemIds: [],
      selectedFilter: JSON.parse(JSON.stringify(boughtItemsFilter)),
    };
  },
  methods: {

  },
  watch: {
    selectedFilter: {
      handler: function (newVal) {
        localStorage.setItem("gladosBoughtItemDataTableFilter", JSON.stringify(this.selectedFilter));
        console.log("Saved new filter");
      },
      deep: true
    },
  },
  beforeMount() {
    const filterObject = localStorage.getItem("gladosBoughtItemDataTableFilter");
    if (filterObject != null) { this.selectedFilter = JSON.parse(filterObject) }
  },
  computed: {
  }
}
</script>

<template>
  <div class="scope">
    <div class="grid" v-bind:class="{ 'show-changelog': controlsShowChangelog }">
      <div id="controls" class="controls">
        <Controls v-model:selected-item-ids="selectedItemIds" v-model:trigger-get-new-data="triggerGetNewData"
          v-model:filter="selectedFilter" v-model:show-changelog="controlsShowChangelog"
          v-model:show-rainbow="controlsShowRainbow" v-model:show-text-only="controlsShowTextOnly"
          v-model:showFixHeight="controlsShowFixHeight"
          v-model:show-unclutter="controlsShowUnclutter" v-model:show-request-view="controlsShowRequestView">
        </Controls>
      </div>
      <div id="data" class="data">
        <DataTable v-model:selected-item-ids="selectedItemIds" v-model:trigger-get-new-data="triggerGetNewData"
          v-model:filter="selectedFilter" v-model:show-text-only="controlsShowTextOnly"
          v-model:show-rainbow="controlsShowRainbow" v-model:showFixHeight="controlsShowFixHeight"
          v-model:show-unclutter="controlsShowUnclutter"
          v-model:show-request-view="controlsShowRequestView">
        </DataTable>
      </div>
      <div id="changelog" class="changelog" v-if="controlsShowChangelog">
        <Changelog v-model:selected-item-ids="selectedItemIds"></Changelog>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css">

</style>
<style scoped lang="scss">
@import "../../../assets/variables.scss";

.scope {
  width: 100%;
  height: 100%;
}

.grid {
  // width: 100%;
  // height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 250px;
  right: 0;

  display: grid;

  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: 150px auto;
  grid-template-areas: "controls"
    "data"
}

.show-changelog {
  grid-template-rows: 150px auto 200px;
  grid-template-areas: "controls"
    "data"
    "changelog";
}

.grid .controls {
  padding: 10px;
}

.grid .data {
  overflow: auto;
  padding: 10px;
  border-radius: 5px;
}

.grid .changelog {
  // overflow: auto;
  padding: 10px;
  padding-top: 5px;
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
