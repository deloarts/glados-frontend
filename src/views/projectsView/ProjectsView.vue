<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useBoughtItemsControlsStore } from '@/stores/controls'
import { useProjectsStore } from '@/stores/projects'
import { useProjectFilterStore } from '@/stores/filter'

import DataTable from '@/components/projects/table/DataTable.vue'
import Controls from '@/components/projects/Controls.vue'
import ControlsPage from '@/components/common/ControlsPage.vue'

const router = useRouter()
const route = useRoute()

const projectsStore = useProjectsStore()
const projectFilterStore = useProjectFilterStore()
const controlsStore = useBoughtItemsControlsStore()

onBeforeMount(() => {
  projectsStore.getAll()
})

onMounted(() => {
  if (route.query != null) {
    projectsStore.clear()
  }

  // Apply id query
  if (route.query.id != null && !isNaN(Number(route.query.id))) {
    projectFilterStore.state.id = Number(route.query.id)
  }
  // Apply project number query
  if (route.query.projectNumber != null) {
    projectFilterStore.state.number = String(route.query.projectNumber)
  }

  projectsStore.getItems()
  //@ts-ignore
  router.replace({ query: null })
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid" v-bind:class="{ 'show-changelog': controlsStore.state.changelog }">
        <div id="controls" class="controls">
          <Controls />
        </div>
        <div id="data" class="data">
          <DataTable />
        </div>
        <div id="controls-page" class="controls">
          <ControlsPage :item-store="projectsStore" :filter-store="projectFilterStore" />
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
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    'controls'
    'data'
    'controls-page';
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
