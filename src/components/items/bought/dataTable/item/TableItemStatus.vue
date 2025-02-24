<script setup lang="ts">
import { computed } from 'vue'

import type { BoughtItemSchema } from '@/schemas/boughtItem'

import TableItemSelect from '@/components/dataTable/TableItemSelect.vue'

import { boughtItemColumnWidths } from '@/presets/columnWidth'

import { boughtItemsRequest } from '@/requests/api/items'

import { useLanguageStore } from '@/stores/language'
import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useStatusStore } from '@/stores/status'
import { useBoughtItemsControlsStore } from '@/stores/controls'
import { useBoughtItemFilterStore } from '@/stores/filter'

const languageStore = useLanguageStore()
const boughtItemsStore = useBoughtItemsStore()
const controlsStore = useBoughtItemsControlsStore()
const boughtItemFilterStore = useBoughtItemFilterStore()
const statusStore = useStatusStore()

const props = defineProps<{
  item: BoughtItemSchema
  width: typeof boughtItemColumnWidths
}>()

const computedStatus = computed<string>(() => {
  return languageStore.l.boughtItem.options.status[
    props.item.status as keyof typeof languageStore.l.boughtItem.options.status
  ]
})
</script>

<template>
  <TableItemSelect
    v-if="controlsStore.columns.status"
    name="Status"
    :value="props.item.status"
    :display-value="computedStatus"
    :options="statusStore.boughtItemStatusOption"
    :update-method="boughtItemsRequest.putItemsStatus"
    :item-store="boughtItemsStore"
    :filter-store="boughtItemFilterStore"
    filter-store-key="status"
    :width="props.width.status"
    :center="true"
    :fixed-height="controlsStore.state.fixedHeight"
    :edit-mode="boughtItemsStore.getSelection().includes(item.id)"
  />
</template>

<style scoped lang="scss"></style>
