<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from 'vue'

import { useUserTimeStore } from "@/stores/userTime";

import Spinner from '@/components/spinner/LoadingSpinner.vue'

import { userTimeColumnWidth } from "@/presets/columnWidth";

import TableMain from '@/components/dataTable/TableMain.vue'
import DataTableHead from './DataTableHead.vue'
import DataTableBody from './DataTableBody.vue'

const userTimeStore = useUserTimeStore();

const colW = ref<typeof userTimeColumnWidth>(JSON.parse(JSON.stringify(userTimeColumnWidth)))

function eventKeyUp(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    userTimeStore.clearSelection()
  }
}

onBeforeMount(() => {
  document.addEventListener('keyup', eventKeyUp)
  colW.value = JSON.parse(JSON.stringify(userTimeColumnWidth))
})

onUnmounted(() => {
  document.removeEventListener('keyup', eventKeyUp)
})
</script>

<template>
  <div class="scope">
    <Spinner class="spinner" v-if="userTimeStore.loading && userTimeStore.items.length == 0" />
    <TableMain>
      <DataTableHead v-model:colW="colW" />
      <DataTableBody v-model:colW="colW" />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableScope.scss';
</style>
