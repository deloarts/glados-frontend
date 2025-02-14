<script setup lang="ts">
import { onBeforeMount } from 'vue'

import { useUserTimeStore } from '@/stores/userTime'
import { useUserTimeFilterStore } from '@/stores/filter'

import DataTable from '@/components/userTime/table/DataTable.vue'
import UserTimeChart from '@/components/userTime/UserTimeChart.vue'
import Controls from '@/components/userTime/ControlsMain.vue'
import ControlsPage from '@/components/common/ControlsPage.vue'

const userTimeStore = useUserTimeStore()
const userTimeFilterStore = useUserTimeFilterStore()

onBeforeMount(() => {
  userTimeStore.getItems()
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid">
        <div id="controls" class="controls">
          <Controls />
        </div>
        <div id="week">
          <UserTimeChart />
        </div>
        <div id="data" class="data">
          <DataTable />
        </div>
        <div id="controls-page" class="controls">
          <ControlsPage :item-store="userTimeStore" :filter-store="userTimeFilterStore" />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

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
  grid-template-rows: min-content 250px auto min-content;
  grid-template-areas:
    'controls'
    'week'
    'data'
    'controls-page';
}

.controls {
  overflow: auto;
}

.data {
  overflow: auto;
  padding-bottom: 2px;
  padding-top: 8px;
}

// grid
#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}

#week {
  grid-area: week;
}
</style>
