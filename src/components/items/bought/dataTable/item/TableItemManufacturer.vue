<script setup lang="ts">
import type { BoughtItemSchema } from '@/schemas/boughtItem'

import TableItemInput from '@/components/dataTable/TableItemInput.vue'

import { boughtItemColumnWidths } from '@/presets/columnWidth'

import { boughtItemsRequest } from '@/requests/api/items'

import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useBoughtItemsControlsStore } from '@/stores/controls'

const boughtItemsControlsStore = useBoughtItemsControlsStore()
const boughtItemsStore = useBoughtItemsStore()
const boughtItemFilterStore = useBoughtItemFilterStore()

const props = defineProps<{
  item: BoughtItemSchema
  width: typeof boughtItemColumnWidths
}>()
</script>

<template>
  <TableItemInput
    v-if="boughtItemsControlsStore.columns.manufacturer"
    name="Manufacturer"
    :value="item.manufacturer"
    :update-method="boughtItemsRequest.putItemsManufacturer"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="manufacturer"
    :width="props.width.manufacturer"
    :fixed-height="boughtItemsControlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
