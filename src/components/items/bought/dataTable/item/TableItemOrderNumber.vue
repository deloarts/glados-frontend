<script setup lang="ts">
import type { BoughtItemSchema } from '@/schemas/boughtItem'

import TableItemInput from '@/components/dataTable/TableItemInput.vue'

import { boughtItemColumnWidths } from '@/presets/columnWidth'

import { boughtItemsRequest } from '@/requests/api/items'

import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useBoughtItemsControlsStore } from '@/stores/controls'
import { useBoughtItemFilterStore } from '@/stores/filter'

const boughtItemsStore = useBoughtItemsStore()
const controlsStore = useBoughtItemsControlsStore()
const boughtItemFilterStore = useBoughtItemFilterStore()

const props = defineProps<{
  item: BoughtItemSchema
  width: typeof boughtItemColumnWidths
}>()
</script>

<template>
  <TableItemInput
    v-if="controlsStore.columns.orderNumber"
    name="Order Number"
    :value="item.order_number"
    :update-method="boughtItemsRequest.putItemsOrderNumber"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="orderNumber"
    :width="props.width.orderNumber"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
