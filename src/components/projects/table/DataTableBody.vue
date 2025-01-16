<script setup lang="ts">
import { ref, computed } from 'vue'

import { useProjectsStore } from '@/stores/projects'

import { getSelection } from '@/helper/selection.helper'

import { projectsColumnWidths } from '@/presets/columnWidth'

import DataTableBodyRow from '@/components/dataTable/DataTableBodyRow.vue'
import TableItemEmpty from '@/components/dataTable/TableItemEmpty.vue'

import TableItemNumber from './item/TableItemNumber.vue'
import TableItemID from './item/TableItemID.vue'
import TableItemProjectNumber from './item/TableItemProjectNumber.vue'
import TableItemProductNumber from './item/TableItemProductNumber.vue'
import TableItemProjectLink from './item/TableItemProjectLink.vue'
import TableItemCustomer from './item/TableItemCustomer.vue'
import TableItemDescription from './item/TableItemDescription.vue'
import TableItemDesignatedUser from './item/TableItemDesignatedUser.vue'
import TableItemCreatedDate from './item/TableItemCreatedDate.vue'
import TableItemState from './item/TableItemState.vue'

const projectsStore = useProjectsStore()

const props = defineProps<{
  colW: typeof projectsColumnWidths
}>()
const emit = defineEmits<{
  (e: 'update:colW', v: typeof projectsColumnWidths): void
}>()

const computedColW = computed<typeof projectsColumnWidths>({
  get() {
    return props.colW
  },
  set(newValue) {
    emit('update:colW', newValue)
    return newValue
  },
})

// Selection
const lineIndex = ref<number>(0)
function multiSelect(event: Event, id: number, index: number) {
  lineIndex.value = getSelection(event, id, index, lineIndex.value, projectsStore)
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in projectsStore.items"
      :key="item.id"
      :selected="projectsStore.getSelection().includes(item.id)"
      v-on:click="multiSelect($event, item.id, index)"
    >
      <TableItemNumber
        :index="index + (projectsStore.page.current - 1) * projectsStore.page.limit"
        :item="item"
        v-model:width="computedColW"
      />
      <TableItemID :item="item" v-model:width="computedColW" />
      <TableItemProjectNumber :item="item" v-model:width="computedColW" />
      <TableItemProductNumber :item="item" v-model:width="computedColW" />
      <TableItemProjectLink :item="item" v-model:width="computedColW" />
      <TableItemCustomer :item="item" v-model:width="computedColW" />
      <TableItemDescription :item="item" v-model:width="computedColW" />
      <TableItemDesignatedUser :item="item" v-model:width="computedColW" />
      <TableItemCreatedDate :item="item" v-model:width="computedColW" />
      <TableItemState :item="item" v-model:width="computedColW" />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
