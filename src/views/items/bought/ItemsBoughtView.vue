<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useProjectsStore } from '@/stores/projects'
import { useProjectFilterStore } from '@/stores/filter'
import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useBoughtItemsControlsStore } from '@/stores/controls'

import Changelog from '@/components/items/bought/Changelog.vue'
import DataTable from '@/components/items/bought/dataTable/DataTable.vue'
import Controls from '@/components/items/bought/Controls.vue'

const router = useRouter()
const route = useRoute()

const projectsStore = useProjectsStore()
const projectFilterStore = useProjectFilterStore()
const boughtItemsStore = useBoughtItemsStore()
const controlsStore = useBoughtItemsControlsStore()
const boughtItemFilterStore = useBoughtItemFilterStore()

onBeforeMount(() => {
  projectFilterStore.reset()
  projectsStore.getItems()
})

onMounted(() => {
  if (route.query != null) {
    boughtItemsStore.clear()
  }

  // Apply id query
  if (route.query.id != null && !isNaN(Number(route.query.id))) {
    boughtItemFilterStore.state.id = Number(route.query.id)
  }
  // Apply project number query
  if (route.query.projectNumber != null) {
    boughtItemFilterStore.state.projectNumber = String(route.query.projectNumber)
  }

  boughtItemsStore.getItems()
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
        <div id="changelog" class="changelog" v-if="controlsStore.state.changelog">
          <Changelog />
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
  grid-template-rows: min-content auto;
  grid-template-areas:
    'controls'
    'data';
}

.show-changelog {
  grid-template-rows: min-content auto 200px;
  grid-template-areas:
    'controls'
    'data'
    'changelog';
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
