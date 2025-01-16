<script setup lang="ts">
import { boughtItemColumnWidths } from '@/presets/columnWidth'

import { useBoughtItemsBatchImportStore } from '@/stores/boughtItems'
import { useProjectsStore } from '@/stores/projects'

import TableItemEmpty from '@/components/dataTable/TableItemEmpty.vue'
import DataTableBodyRow from '@/components/dataTable/DataTableBodyRow.vue'
import TableItemRowNumber from '@/components/dataTable/TableItemRowNumber.vue'

import CreateItemTableInput from './CreateItemTableInput.vue'
import CreateItemTableSelectProject from './CreateItemTableSelectProject.vue'
import CreateItemTableButtonCreate from './CreateItemTableButtonCreate.vue'
import CreateItemTableButtonDelete from './CreateItemTableButtonDelete.vue'

const boughtItemBatchImportStore = useBoughtItemsBatchImportStore()
const projectsStore = useProjectsStore()

const props = defineProps<{
  colW: typeof boughtItemColumnWidths
}>()

function onDelete(index: number) {
  boughtItemBatchImportStore.removeItem(index)
}

function onCreate(index: number) {
  boughtItemBatchImportStore.createItem(index)
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in boughtItemBatchImportStore.items"
      :key="index"
      :selected="false"
    >
      <CreateItemTableButtonCreate @click="onCreate(index)" />
      <CreateItemTableButtonDelete @click="onDelete(index)" />
      <TableItemRowNumber :number="index + 1" />
      <CreateItemTableSelectProject
        v-model:value="item.project_id"
        :width="props.colW.projectNumber"
        :error="item.project_id_error"
        :center="true"
      />
      <CreateItemTableInput
        :value="projectsStore.getProductNumber(item.project_id)"
        :width="props.colW.productNumber"
        :center="true"
        :disabled="true"
      />
      <CreateItemTableInput
        v-model:value="item.quantity"
        :width="props.colW.quantity"
        :error="item.quantity_error"
        :center="true"
      />
      <CreateItemTableInput
        v-model:value="item.unit"
        :width="props.colW.unit"
        :error="item.unit_error"
        :center="true"
      />
      <CreateItemTableInput
        v-model:value="item.weblink"
        :width="props.colW.weblink"
        :error="item.weblink_error"
      />
      <CreateItemTableInput
        v-model:value="item.partnumber"
        :width="props.colW.partnumber"
        :error="item.partnumber_error"
      />
      <CreateItemTableInput
        v-model:value="item.order_number"
        :width="props.colW.orderNumber"
        :error="item.order_number_error"
      />
      <CreateItemTableInput
        v-model:value="item.manufacturer"
        :width="props.colW.manufacturer"
        :error="item.manufacturer_error"
      />
      <CreateItemTableInput
        v-model:value="item.supplier"
        :width="props.colW.supplier"
        :error="item.supplier_error"
      />
      <CreateItemTableInput
        v-model:value="item.group_1"
        :width="props.colW.group1"
        :error="item.group1_error"
      />
      <CreateItemTableInput
        v-model:value="item.note_general"
        :width="props.colW.noteGeneral"
        :error="item.note_general_error"
      />
      <CreateItemTableInput
        v-model:value="item.note_supplier"
        :width="props.colW.noteSupplier"
        :error="item.note_supplier_error"
      />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
