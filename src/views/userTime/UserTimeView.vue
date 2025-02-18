<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

import { useUserTimeStore } from '@/stores/userTime'
import { useUserTimeFilterStore } from '@/stores/filter'
import { useResolutionStore } from '@/stores/resolution'

import DataTable from '@/components/userTime/table/DataTable.vue'
import UserTimeChartTime from '@/components/userTime/UserTimeChartTime.vue'
import UserTimeChartSum from '@/components/userTime/UserTimeChartSum.vue'
import UserTimeChartHours from '@/components/userTime/UserTimeChartHours.vue'
import Controls from '@/components/userTime/ControlsMain.vue'
import ControlsPage from '@/components/common/ControlsPage.vue'

const userTimeStore = useUserTimeStore()
const userTimeFilterStore = useUserTimeFilterStore()
const resolutionStore = useResolutionStore()

const gtMinWidthTablet = computed(() => resolutionStore.gtMinWidthTablet)

onBeforeMount(() => {
  userTimeStore.clearSelection()
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
        <div id="week-hours">
          <UserTimeChartHours v-if="gtMinWidthTablet" />
        </div>
        <div id="week-sum">
          <UserTimeChartSum />
        </div>
        <div id="week-time" v-if="gtMinWidthTablet">
          <UserTimeChartTime />
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
@use '@/scss/variables.scss' as *;
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
  grid-template-columns: 300px 1fr 1fr;
  grid-template-rows: min-content 300px auto min-content;
  grid-template-areas:
    'controls controls controls'
    'week-hours week-sum week-time'
    'data data data'
    'controls-page controls-page controls-page';
}
@media screen and (max-width: $max-width-tablet) {
  .grid {
    width: 100%;
    height: 100%;

    display: grid;

    grid-gap: 10px;
    grid-template-columns: 100%;
    grid-template-rows: min-content 300px auto min-content;
    grid-template-areas:
      'controls'
      'week-sum'
      'data'
      'controls-page';
  }
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

#controls-page {
  grid-area: controls-page;
}

#week-time {
  grid-area: week-time;
}

#week-sum {
  grid-area: week-sum;
}

#week-hours {
  grid-area: week-hours;
}
</style>
