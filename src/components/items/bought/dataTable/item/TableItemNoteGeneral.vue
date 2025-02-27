<script setup lang="ts">
import type { BoughtItemSchema } from '@/schemas/boughtItem'

import TableItemTextarea from '@/components/dataTable/TableItemTextarea.vue'

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
  <TableItemTextarea
    v-if="controlsStore.columns.noteGeneral"
    name="General Note"
    :value="item.note_general"
    :update-method="boughtItemsRequest.putItemsNoteGeneral"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="noteGeneral"
    :width="props.width.noteGeneral"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
