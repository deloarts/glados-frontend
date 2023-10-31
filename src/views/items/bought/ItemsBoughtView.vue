<script setup>
import { ref, watch, onBeforeMount, onBeforeUnmount } from "vue"
import { useBoughtItemFilterStore } from "@/stores/filter.js"
import { useBoughtItemsControlsStore } from "@/stores/controls.js"

import Changelog from "@/components/items/bought/Changelog.vue"
import DataTable from "@/components/items/bought/DataTable.vue"
import Controls from "@/components/items/bought/Controls.vue"

// Store
const filterStore = useBoughtItemFilterStore()
const controlsStore = useBoughtItemsControlsStore()

// Items
const selectedItemIds = ref([])
const triggerGetNewData = ref(false)

watch(filterStore.$state, () => {
  localStorage.setItem("gladosBoughtItemControls", JSON.stringify(controlsStore.$state))
  localStorage.setItem("gladosBoughtItemDataTableFilter", JSON.stringify(filterStore.$state))
}, { deep: true })

onBeforeMount(() => {
  const controlsObject = localStorage.getItem("gladosBoughtItemControls")
  if (controlsObject != null) { controlsStore.$state = JSON.parse(controlsObject) }

  const filterObject = localStorage.getItem("gladosBoughtItemDataTableFilter")
  if (filterObject != null) { filterStore.$state = JSON.parse(filterObject) }
})

onBeforeUnmount(() => {
  localStorage.setItem("gladosBoughtItemControls", JSON.stringify(controlsStore.$state))
  localStorage.setItem("gladosBoughtItemDataTableFilter", JSON.stringify(filterStore.$state))
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid" v-bind:class="{ 'show-changelog': controlsStore.changelog }">
        <div id="controls" class="controls">
          <Controls v-model:selected-item-ids="selectedItemIds" v-model:trigger-get-new-data="triggerGetNewData" />
        </div>
        <div id="data" class="data">
          <DataTable v-model:selected-item-ids="selectedItemIds" v-model:trigger-get-new-data="triggerGetNewData" />
        </div>
        <div id="changelog" class="changelog" v-if="controlsStore.changelog">
          <Changelog v-model:selected-item-ids="selectedItemIds"></Changelog>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css">

</style>
<style scoped lang="scss">
@import '@/scss/variables.scss';
@import '@/scss/views.scss';
@import '@/scss/grid/gridBase.scss';

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
  grid-template-areas: "controls"
    "data"
}

.show-changelog {
  grid-template-rows: min-content auto 200px;
  grid-template-areas: "controls"
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
