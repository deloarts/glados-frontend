<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted } from 'vue'

import { useBoughtItemsStore } from '@/stores/boughtItems'

import Spinner from '@/components/spinner/LoadingSpinner.vue'

import { boughtItemColumnWidths } from '@/presets/columnWidth'

import TableMain from '@/components/dataTable/TableMain.vue'
import DataTableHead from './DataTableHead.vue'
import DataTableBody from './DataTableBody.vue'

const boughtItemsStore = useBoughtItemsStore()
const colW = ref<typeof boughtItemColumnWidths>(JSON.parse(JSON.stringify(boughtItemColumnWidths)))

function eventKeyUp(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    boughtItemsStore.clearSelection()
  }
}

onBeforeMount(() => {
  document.addEventListener('keyup', eventKeyUp)
  colW.value = JSON.parse(JSON.stringify(boughtItemColumnWidths))
})

onUnmounted(() => {
  document.removeEventListener('keyup', eventKeyUp)
})
</script>

<template>
  <div class="scope">
    <Spinner
      class="spinner"
      v-if="boughtItemsStore.loading && boughtItemsStore.items.length == 0"
    />
    <TableMain>
      <DataTableHead v-model:colW="colW" />
      <DataTableBody v-model:colW="colW" />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableScope.scss';
</style>
