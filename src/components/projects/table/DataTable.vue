<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from 'vue'

import { useProjectsStore } from '@/stores/projects'

import Spinner from '@/components/spinner/LoadingSpinner.vue'

import { projectsColumnWidths } from '@/presets/columnWidth'

import TableMain from '@/components/dataTable/TableMain.vue'
import DataTableHead from './DataTableHead.vue'
import DataTableBody from './DataTableBody.vue'

const projectsStore = useProjectsStore()

// @ts-ignore
const colW = ref<typeof projectsColumnWidths>(null)

function eventKeyUp(event: any) {
  if (event.key === 'Escape') {
    projectsStore.clearSelection()
  }
}

onBeforeMount(() => {
  document.addEventListener('keyup', eventKeyUp)
  colW.value = JSON.parse(JSON.stringify(projectsColumnWidths))
})

onUnmounted(() => {
  document.removeEventListener('keyup', eventKeyUp)
})
</script>

<template>
  <div class="scope">
    <Spinner class="spinner" v-if="projectsStore.loading && projectsStore.items.length == 0" />
    <TableMain>
      <DataTableHead v-model:colW="colW" />
      <DataTableBody v-model:colW="colW" />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableScope.scss';
</style>
