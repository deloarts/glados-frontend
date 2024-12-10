<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { boughtItemColumnWidths } from '@/presets/columnWidth'

import TableMain from '@/components/dataTable/TableMain.vue'
import CreateItemTableHead from './CreateItemTableHead.vue'
import CreateItemTableBody from './CreateItemTableBody.vue'

//@ts-ignore
const colW = ref<typeof boughtItemColumnWidths>(null)

onBeforeMount(() => {
  colW.value = JSON.parse(JSON.stringify(boughtItemColumnWidths))
})
</script>

<template>
  <div class="scope">
    <TableMain>
      <CreateItemTableHead v-model:colW="colW" />
      <CreateItemTableBody v-model:colW="colW" />
    </TableMain>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableScope.scss';
</style>
